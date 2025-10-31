-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2025 a las 14:57:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `lote` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `entryDate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `lote`, `name`, `price`, `quantity`, `entryDate`, `createdAt`, `updatedAt`) VALUES
(3, 't-A001', 'Teclado mecanico', 15000.00, 0, '2025-10-30', '2025-10-31 02:00:56', '2025-10-31 03:36:11'),
(5, 'p-0061', 'Celular iphone 15', 3800000.00, 8, '2025-10-31', '2025-10-31 12:04:02', '2025-10-31 12:06:50'),
(6, 'p-0090', 'Celular iphone 16', 3800000.00, 10, '2025-10-31', '2025-10-31 13:06:48', '2025-10-31 13:06:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `total`, `date`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 0.00, '2025-10-30 14:52:08', '2025-10-30 14:52:08', '2025-10-30 14:52:08', 1),
(2, 0.00, '2025-10-30 14:54:53', '2025-10-30 14:54:53', '2025-10-30 14:54:53', 1),
(3, 255000.00, '2025-10-30 14:55:05', '2025-10-30 14:55:05', '2025-10-30 14:55:05', 1),
(4, 85000.00, '2025-10-30 15:52:32', '2025-10-30 15:52:32', '2025-10-30 15:52:32', 1),
(5, 0.00, '2025-10-31 02:10:59', '2025-10-31 02:10:59', '2025-10-31 02:10:59', 2),
(6, 185000.00, '2025-10-31 02:11:25', '2025-10-31 02:11:25', '2025-10-31 02:11:25', 2),
(7, 315000.00, '2025-10-31 02:29:53', '2025-10-31 02:29:53', '2025-10-31 02:29:53', 2),
(8, 315000.00, '2025-10-31 03:09:37', '2025-10-31 03:09:37', '2025-10-31 03:09:37', 2),
(9, 315000.00, '2025-10-31 03:21:30', '2025-10-31 03:21:30', '2025-10-31 03:21:30', 3),
(11, 315000.00, '2025-10-31 03:22:13', '2025-10-31 03:22:13', '2025-10-31 03:22:13', 3),
(12, 0.00, '2025-10-31 03:27:46', '2025-10-31 03:27:46', '2025-10-31 03:27:46', 2),
(13, 285000.00, '2025-10-31 03:28:16', '2025-10-31 03:28:16', '2025-10-31 03:28:17', 2),
(14, 0.00, '2025-10-31 03:35:57', '2025-10-31 03:35:57', '2025-10-31 03:35:57', 2),
(15, 270000.00, '2025-10-31 03:36:11', '2025-10-31 03:36:11', '2025-10-31 03:36:11', 2),
(16, 0.00, '2025-10-31 03:40:17', '2025-10-31 03:40:17', '2025-10-31 03:40:17', 2),
(17, 0.00, '2025-10-31 03:40:40', '2025-10-31 03:40:40', '2025-10-31 03:40:40', 2),
(18, 3150000.00, '2025-10-31 03:43:37', '2025-10-31 03:43:37', '2025-10-31 03:43:37', 2),
(19, 1050000.00, '2025-10-31 03:44:08', '2025-10-31 03:44:08', '2025-10-31 03:44:08', 2),
(20, 1050000.00, '2025-10-31 03:45:54', '2025-10-31 03:45:54', '2025-10-31 03:45:54', 2),
(21, 1050000.00, '2025-10-31 03:48:17', '2025-10-31 03:48:17', '2025-10-31 03:48:17', 2),
(22, 1050000.00, '2025-10-31 03:53:18', '2025-10-31 03:53:18', '2025-10-31 03:53:18', 3),
(23, 8650000.00, '2025-10-31 12:06:50', '2025-10-31 12:06:50', '2025-10-31 12:06:50', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_items`
--

CREATE TABLE `purchase_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `purchaseId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchase_items`
--

INSERT INTO `purchase_items` (`id`, `quantity`, `price`, `purchaseId`, `productId`, `subtotal`) VALUES
(1, 3, 85000.00, 3, NULL, 255000.00),
(2, 1, 85000.00, 4, NULL, 85000.00),
(3, 2, 85000.00, 6, NULL, 170000.00),
(4, 1, 15000.00, 6, 3, 15000.00),
(5, 3, 85000.00, 7, NULL, 255000.00),
(6, 4, 15000.00, 7, 3, 60000.00),
(7, 3, 85000.00, 8, NULL, 255000.00),
(8, 4, 15000.00, 8, 3, 60000.00),
(9, 3, 85000.00, 9, NULL, 255000.00),
(10, 4, 15000.00, 9, 3, 60000.00),
(11, 3, 85000.00, 11, NULL, 255000.00),
(12, 4, 15000.00, 11, 3, 60000.00),
(13, 3, 85000.00, 12, NULL, 255000.00),
(14, 4, 15000.00, 12, 3, 60000.00),
(15, 3, 85000.00, 13, NULL, 255000.00),
(16, 2, 15000.00, 13, 3, 30000.00),
(17, 3, 85000.00, 14, NULL, 255000.00),
(18, 2, 15000.00, 14, 3, 30000.00),
(19, 3, 85000.00, 15, NULL, 255000.00),
(20, 1, 15000.00, 15, 3, 15000.00),
(21, 3, 85000.00, 16, NULL, 255000.00),
(22, 3, 85000.00, 17, NULL, 255000.00),
(23, 3, 1050000.00, 18, NULL, 3150000.00),
(24, 1, 1050000.00, 19, NULL, 1050000.00),
(25, 1, 1050000.00, 20, NULL, 1050000.00),
(26, 1, 1050000.00, 21, NULL, 1050000.00),
(27, 1, 1050000.00, 22, NULL, 1050000.00),
(28, 1, 1050000.00, 23, NULL, 1050000.00),
(29, 2, 3800000.00, 23, 5, 7600000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `total`, `date`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 85000.00, '2025-10-30 16:00:28', '2025-10-30 16:00:28', '2025-10-30 16:00:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `saleId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` enum('ADMIN','CLIENT') NOT NULL DEFAULT 'CLIENT',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Camilo', 'camilo@example.com', '$2b$10$AS/TyOxmhrEo0ZrFtN798erSExAQiMnywjN/eWU8K9GljbAyFsPuC', 'ADMIN', '2025-10-30 03:57:21', '2025-10-30 03:57:21'),
(2, 'Juan', 'juan@example.com', '$2b$10$qVa/Phoo58Q8r..txil23OKICZam.iL3ehI.1TUPSE2foK7Gk8jSy', 'CLIENT', '2025-10-30 19:05:59', '2025-10-30 19:05:59'),
(3, 'Pedro', 'pedro@example.com', '$2b$10$3VKxyYXIoXRGqlMaLi5jAO0dkp.wTlGM29jvrVd06j8dxWitUwH3i', 'CLIENT', '2025-10-31 03:19:23', '2025-10-31 03:19:23'),
(4, 'Andres', 'andres@example.com', '$2b$10$VUYODaTFJadAWNPJUm53FehCq9Ueb/BSnySLu7E0n79ZhFFhjBsz2', 'CLIENT', '2025-10-31 12:11:05', '2025-10-31 12:11:05'),
(5, 'Carolina', 'carolina@example.com', '$2b$10$UWPB8t8khsTH1Sgt7JSbcOi2H5WwJbO0cRmX4AeWq8kt3qT3nFKrW', 'ADMIN', '2025-10-31 12:59:26', '2025-10-31 12:59:26'),
(6, 'Laura', 'laura@example.com', '$2b$10$Q/uXPvmvaTh6dOTMMzOo5.0tHfCa71a0Se3lIQOP/CJ.CyZg/L7sK', 'CLIENT', '2025-10-31 13:08:33', '2025-10-31 13:08:33');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `purchase_items_productId_purchaseId_unique` (`purchaseId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sale_items_productId_saleId_unique` (`saleId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD CONSTRAINT `purchase_items_ibfk_125` FOREIGN KEY (`purchaseId`) REFERENCES `purchases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_items_ibfk_126` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `sale_items_ibfk_91` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_items_ibfk_92` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
