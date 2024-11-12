-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 12-11-2024 a las 05:04:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digital_agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--

CREATE TABLE `courses` (
  `id_course` int(11) NOT NULL,
  `name_course` varchar(20) NOT NULL,
  `days` varchar(20) NOT NULL,
  `titular` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id_course`, `name_course`, `days`, `titular`) VALUES
(1, '4th year', 'tuesday and friday', 0),
(3, '7th year', 'tuesday', 1),
(4, '3rd year', 'monday', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localities`
--

CREATE TABLE `localities` (
  `id_locality` int(11) NOT NULL,
  `locality_description` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localities`
--

INSERT INTO `localities` (`id_locality`, `locality_description`) VALUES
(2, 'Glew'),
(3, 'CABA'),
(4, 'Burzaco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schools`
--

CREATE TABLE `schools` (
  `id_school` int(11) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `school_address` varchar(30) NOT NULL,
  `locality` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `schools`
--

INSERT INTO `schools` (`id_school`, `school_name`, `school_address`, `locality`) VALUES
(5, 'EPB N°4', 'Direccion 1234', 2),
(6, 'EST N°2', 'Francisco Beiró 333', 2),
(7, 'EST N°6', 'Callee 12234', 4),
(8, 'EST N°8', 'Callee 234', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id_student` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `identity_card` int(8) NOT NULL,
  `course` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id_student`, `name`, `last_name`, `identity_card`, `course`) VALUES
(1, 'Karen Yamilet', 'López', 47656765, '3rd'),
(2, 'Wendy Rubi', 'Reyna', 45787674, '3rd'),
(3, 'Esmeralda Rubi', 'Jimenez', 47227632, '4rd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id_task` int(11) NOT NULL,
  `task_title` varchar(30) NOT NULL,
  `task_description` text NOT NULL,
  `complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id_task`, `task_title`, `task_description`, `complete`) VALUES
(1, 'Corregir test', 'Corregir los examanes de 4to', 0),
(2, 'Prepare exams', 'Prepare exams for tuesday', 0),
(3, 'Prepare exams 1', 'Prepare exams for tuesday 2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(15) NOT NULL,
  `email_user` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `email_user`, `password`, `imagen`) VALUES
(1, 'usuario1modific', 'usuario1@gmail.com', 'usuariopass', ''),
(2, 'usuario2', 'usuario2@gmail.com', 'usuariopass', ''),
(3, 'usuario3', 'usuario3modi@gmail.com', 'usuario3pass', ''),
(4, 'usuario4', 'usuario4@gmail.com', 'usuario4pass', ''),
(5, 'usuario5', 'usuario5@gmail.com', 'usuario5pass', ''),
(6, 'usuario6', 'usuario6@gmail.com', 'usuario6pass', ''),
(7, 'usuario7', 'usuario7@gmail.com', 'usuario7pass', ''),
(10, 'usuario8', 'usuario8@gmail.com', 'usuario8pass', '1731383657211.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id_course`);

--
-- Indices de la tabla `localities`
--
ALTER TABLE `localities`
  ADD PRIMARY KEY (`id_locality`);

--
-- Indices de la tabla `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id_school`),
  ADD KEY `locality` (`locality`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_student`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id_task`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id_course` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `localities`
--
ALTER TABLE `localities`
  MODIFY `id_locality` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `schools`
--
ALTER TABLE `schools`
  MODIFY `id_school` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id_task` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_ibfk_1` FOREIGN KEY (`locality`) REFERENCES `localities` (`id_locality`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
