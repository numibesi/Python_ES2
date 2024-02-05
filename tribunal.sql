-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Fev-2024 às 19:42
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tribunal`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `benefeciario`
--

CREATE TABLE `benefeciario` (
  `id` int(11) NOT NULL,
  `iNumSHR` int(11) NOT NULL,
  `sNif` int(11) NOT NULL,
  `sNome` varchar(255) NOT NULL,
  `iTipoBeneficiario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `benefeciario`
--

INSERT INTO `benefeciario` (`id`, `iNumSHR`, `sNif`, `sNome`, `iTipoBeneficiario`) VALUES
(1, 20021, 148961142, 'PESSOA 22', 4),
(2, 20024, 165576162, 'PESSOA 30', 4),
(3, 20027, 101430310, 'PESSOA 49', 2),
(4, 20031, 106968823, 'PESSOA 69', 3),
(5, 20036, 106900129, 'PESSOA 102', 2),
(6, 20045, 141280840, 'PESSOA 148', 2),
(7, 20049, 101864159, 'PESSOA 155', 3),
(8, 20060, 105901350, 'PESSOA 207', 4),
(9, 20079, 120481383, 'PESSOA 263', 3),
(10, 20080, 118548840, 'PESSOA 264', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `classsrh`
--

CREATE TABLE `classsrh` (
  `id` int(11) NOT NULL,
  `codPag` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `classificador` varchar(255) NOT NULL,
  `iminshr` int(11) NOT NULL,
  `imaxsrh` int(11) NOT NULL,
  `icodservicoref` int(11) NOT NULL,
  `icodservicoval` int(11) NOT NULL,
  `itipobeneficiario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `classsrh`
--

INSERT INTO `classsrh` (`id`, `codPag`, `descricao`, `classificador`, `iminshr`, `imaxsrh`, `icodservicoref`, `icodservicoval`, `itipobeneficiario`) VALUES
(1, 1, 'Magistrados Judiciais', '02.02.10.10.00.263', 50000, 59000, 0, 977777, 1),
(2, 2, 'Oficiais de Justiça - DGAJ', '02.02.10.02.10.256', 20000, 39999, 991201, 988888, 4),
(3, 3, 'Oficiais de Justiça - Tribunais', '02.02.10.02.10.263', 20000, 39999, 0, 988888, 4),
(4, 4, 'Pessoal Regime Geral - DGAJ', '02.02.10.01.10.256', 1, 19999, 991201, 988888, 5),
(5, 5, 'Pessoal Regime Geral - Tribunais', '02.02.10.01.10.263', 1, 19999, 0, 988888, 2),
(6, 6, 'Magistrados Ministério Publico', '02.02.10.10.00.263', 40000, 49999, 0, 988888, 2),
(7, 7, 'Magistrados Tribunais Adm. Fiscais', '02.02.10.10.00.263', 60000, 69999, 0, 988888, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipobeneficiario`
--

CREATE TABLE `tipobeneficiario` (
  `iTipoBeneficiario` int(11) NOT NULL,
  `sDescricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tipobeneficiario`
--

INSERT INTO `tipobeneficiario` (`iTipoBeneficiario`, `sDescricao`) VALUES
(1, 'Magistrados Judiciais'),
(2, 'Magistrados Ministério Publico'),
(3, 'Magistrados Trib. Adm. e Fiscais'),
(4, 'Oficiais de Justiça'),
(5, 'Pessoal Regime Geral'),
(6, 'Sem Categoria Atribuída');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `benefeciario`
--
ALTER TABLE `benefeciario`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `classsrh`
--
ALTER TABLE `classsrh`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tipobeneficiario`
--
ALTER TABLE `tipobeneficiario`
  ADD PRIMARY KEY (`iTipoBeneficiario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `benefeciario`
--
ALTER TABLE `benefeciario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `classsrh`
--
ALTER TABLE `classsrh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tipobeneficiario`
--
ALTER TABLE `tipobeneficiario`
  MODIFY `iTipoBeneficiario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
