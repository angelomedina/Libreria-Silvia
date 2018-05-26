--drop database Central
create database Central
use Central


create table usuario
(
    telefono        char(9) not null,
	nombre          varchar(30) not null,
	primerApellido  varchar(30) not null,
	segundoApellido varchar(30) not null,
	correo          varchar(30) not null,
	tipo            char(1) not null,
	contrase�a      varchar(30) not null,
    constraint pk_telefono_usuario  primary key (telefono),
	constraint chk_telefono_usuario check (telefono like '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
	constraint chk_correo_usuario   check (correo like '_%@_%._%'),
	constraint chk_tipo_usuario     check (tipo in ('A','C')),
);



create table cliente
(
    telefono        char(9) not null,
	monto           int not null,
    constraint pk_telefono_cliente       primary key (telefono),
	constraint fk_telefono_cliente       foreign key (telefono) references usuario,
	constraint chk_telefono_cliente      check (telefono like '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);

create table administrador
(
    telefono        char(9) not null,
    constraint pk_telefono_administrador  primary key (telefono)
);


create table vale
(
	codigo        int IDENTITY(1,1),
	monto         int not null,
	telefono      char(9)   not null,
	fecha         datetime  not null,
	constraint pk_codigo_vale        primary key (codigo),
	constraint chk_telefono_vale     check (telefono like '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
    constraint fk_telefono_vale      foreign key (telefono) references cliente
);

create table solicitud
(
	id        int not null,
	fecha     datetime  not null,
	monto     int not null,
	telefono  char(9) not null,
	constraint pk_id_solicitud          primary key (id),
    constraint fk_telefono_solicitud    foreign key (telefono) references cliente,
    constraint chk_telefono_solicitud   check (telefono like '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);


-------------------------------------------------------------------------------------------------------------------------------------
--drop database Nodo

create database Nodo
use Nodo




create table documento
(
    codigo          int IDENTITY(1,1),
	documento       varchar(max),
	idSolicitud     int not null,
    constraint  pk_codigo_documento  primary key (codigo),
);

--insert into documento(documento,idSolicitud) values ((Select BulkColumn from openrowset(Bulk 'E:\Doccumentos TEC\5 SEMESTRE 2018\BASES II\Proyectos\v1.wmv',SINGLE_BLOB) AS BLOB),1);



create table solicitud
(
	id            int IDENTITY(1,1),
	telefono      char(9)    not null,
	fecha         datetime  not null,
	montoCompra   int not null,
	cantidad      int not null,
	color         char(1) not null,
	estado        char(1) not null,
	pagina        varchar(30),
	constraint pk_id_solicitud  primary key (id),
    constraint chk_telefono_solicitud  check (telefono like '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
	constraint chk_color_solicitud     check (color in ('B','N')),
	constraint chk_estado_solicitud    check (estado in ('F','T'))

);

-------------------------------------------------------------------------------------------------------------------------------------------

--servidor de conexiones remotas primer paso
exec master.dbo.sp_addlinkedserver
	@server = N'localhost',
	@srvproduct = N'SQL Server';
go

--servidor de conexiones remotas segundo paso
-- la contrase�a debe ser la que se ustiliza en cada maquina, en mi caso es esta
exec master.dbo.sp_addlinkedsrvlogin
	@rmtsrvname = N'localhost',
	@rmtuser = N'sa',
	@useself = 'FALSE',
	@rmtpassword = N'deathnote';
go

-----------------------------------------------------------------------------------------------------------------------------------

create PROCEDURE registroClientes
   @telefono		   varchar(9),
    @nombre			   varchar(30),
	@primerApellido    varchar(30),
	@segundoApellido   varchar(30),
	@correo            varchar(30),
	@contraseña        varchar(30),
	@respuesta         BIT OUTPUT,
	@mensaje           varchar(30) output
AS
   begin
		SET NOCOUNT ON;
				BEGIN TRY
					if not exists (select telefono from [localhost].Central.dbo.cliente where @telefono = telefono)
						begin
							insert into [localhost].Central.dbo.usuario (telefono,nombre,primerApellido,segundoApellido,correo,tipo,pass) values(@telefono,@nombre,@primerApellido,@segundoApellido,@correo,'C',@contraseña);
							insert into [localhost].Central.dbo.cliente (telefono,monto) values(@telefono,0);
							SET @respuesta = 1
							SET @mensaje   = 'Usuario agregado exitosamente'
							SELECT @respuesta,@mensaje
						end
					else
						begin
							SET @respuesta = 0
							SET @mensaje   = 'Error usuario ya existente'
							SELECT @respuesta,@mensaje
						end

				END TRY
				BEGIN CATCH
					SET @respuesta = 0
					SELECT @respuesta
					END CATCH
		SET NOCOUNT OFF;
   end

--consulta al servidor
select * from [localhost].Central.dbo.usuario

--ejemplo de query
exec registroClientes '7227-9636','a','b','c','a@gmail.com','123456',0,''


-----------------------------------------------------------------------------------------------------------------------------------
--Activar vales

--consulta al servidor
select * from [localhost].Central.dbo.vale

create PROCEDURE activarVale
    @telefono		   varchar(9),
    @monto			   int,
	@respuesta         BIT OUTPUT,
	@mensaje           varchar(30) output
AS
Declare
   @fecha  datetime

   begin
		SET NOCOUNT ON;
				BEGIN TRY
					set @fecha=GETDATE();
					if exists (select telefono from [localhost].Central.dbo.cliente where @telefono = telefono)
						begin
							insert into [localhost].Central.dbo.vale (monto,telefono,fecha) values(@monto,@telefono,@fecha);
							Update [localhost].Central.dbo.cliente  set monto=monto+@Monto where telefono=@telefono;
							SET @respuesta = 1
							SET @mensaje   = 'Vale agregado exitosamente'
							SELECT @respuesta,@mensaje
						end
					else
						begin
							SET @respuesta = 0
							SET @mensaje   = 'Error usuario no encontrado'
							SELECT @respuesta,@mensaje
						end


				END TRY
				BEGIN CATCH
					SET @respuesta = 0
					SELECT @respuesta
					END CATCH
		SET NOCOUNT OFF;
   end
GO

select * from [localhost].Central.dbo.usuario
select * from [localhost].Central.dbo.vale
select * from [localhost].Central.dbo.cliente



--ejemplo de query
exec activarVale '7227-9636',1000,0



-----------------------------------------------------------------------------------------------------------------------------------

--Realizar solicitud

drop procedure  realizarPedido

create PROCEDURE realizarPedido
    @telefono		   varchar(9),
	@cantidad		   int,
	@color             char(1),
	@pagina            varchar(30),
	@montoDOC          int,
	@documento         varchar(max),
	@respuesta         BIT OUTPUT,
	@mensaje           varchar(30) output
AS
Declare
   @montoDisponible int,
   @resto int,
   @idSolicitud int,
   @fecha  datetime;
   begin
		SET NOCOUNT ON;
				BEGIN TRY
					set @fecha=GETDATE();
					if exists (select telefono from [localhost].Central.dbo.cliente where @telefono = telefono)
						begin
						       set @montoDisponible = (select monto from [localhost].Central.dbo.cliente where @telefono = telefono);

						       if(@montoDisponible >= @montoDOC)
											begin
												set @resto = @montoDisponible-@montoDOC;


												  --verificamos que usuario y saldo sean suficientes(de atras)

												  insert into solicitud(telefono,fecha,montoCompra,cantidad,color,estado,pagina) values(@telefono,@fecha,@montoDOC,@cantidad,@color,'T',@pagina);


												  --buscamos la solicitud
												  set @idSolicitud  = (select id from solicitud where telefono=@telefono and fecha=@fecha);


												  --insertamos documento
												  insert into documento(documento,idSolicitud) values (@documento,@idSolicitud);

												  --solicitud central
												  insert into [localhost].Central.dbo.solicitud (id,fecha,monto,telefono) values(@idSolicitud ,@fecha,@montoDOC,@telefono);

												  ---actualizar monto usuario cntral
												  Update [localhost].Central.dbo.cliente  set monto=@resto where telefono=@telefono;


												  SET @respuesta = 1
												  SET @mensaje   = 'Pedido agregado exitosamente'
											      SELECT @respuesta,@mensaje
											end
								else
								   begin
									   SET @respuesta = 0
									   SET @mensaje   = 'Error saldo insuficiente'
									   SELECT @respuesta,@mensaje
								   end

						  end
					else
						begin
							SET @respuesta = 0
							SET @mensaje   = 'Error usuario no encontrado'
							SELECT @respuesta,@mensaje
						end

				END TRY
				BEGIN CATCH
					SET @respuesta = 0
					SELECT @respuesta
					END CATCH
		SET NOCOUNT OFF;
   end
GO




exec  realizarPedido '7225-9628',2,'B','1-5',500,'tarea1',0,''

select * from [localhost].Central.dbo.cliente
select * from [localhost].Central.dbo.solicitud

select * from solicitud




