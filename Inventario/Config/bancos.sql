-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-01-2024 a las 21:22:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `bancos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `ID_cuenta` int(11) NOT NULL,
  `ID_banco` int(11) NOT NULL,
  `Tipo_cuenta` varchar(250) NOT NULL,
  `Saldo` int(11) NOT NULL,
  `Fecha_apertura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`ID_cuenta`, `ID_banco`, `Tipo_cuenta`, `Saldo`, `Fecha_apertura`) VALUES
(1, 3, 'Ahoro socio', 500, 20240120),
(3, 1, 'Ahorro Programado', 200, 20240120),
(4, 2, 'Ahorro General', 145, 20240120);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`ID_cuenta`),
  ADD KEY `cuentas_bancos` (`ID_banco`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `ID_cuenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD CONSTRAINT `cuentas_bancos` FOREIGN KEY (`ID_banco`) REFERENCES `bancos` (`ID_banco`) ON DELETE CASCADE;
COMMIT;
