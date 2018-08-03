-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Aug 2018 um 13:49
-- Server-Version: 10.1.32-MariaDB
-- PHP-Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `termine_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termine`
--

CREATE TABLE `termine` (
  `id` int(10) NOT NULL,
  `titel` varchar(200) NOT NULL,
  `datum` date NOT NULL,
  `zeit` time NOT NULL,
  `bemerkung` text NOT NULL,
  `kategorie` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `termine`
--

INSERT INTO `termine` (`id`, `titel`, `datum`, `zeit`, `bemerkung`, `kategorie`) VALUES
(1, 'Herby', '2018-08-02', '16:30:00', 'Mal schauen, was geht', 1),
(2, 'Susanne und Ralf', '2018-08-24', '19:00:00', 'Essen in Kreuzberg oder anderswo', 5),
(3, 'Amnesty Türkei', '2018-08-07', '19:00:00', 'Türkei-Gruppe, wo auch immer ', 1),
(4, 'Hartmut', '2018-08-11', '19:00:00', 'kommt evtl. vorbei ...\r\n', 4),
(5, 'Skatabend', '2018-08-14', '19:00:00', 'bei Rainer\r\n', 3),
(6, 'Yasamine', '2018-08-05', '13:30:00', 'S-Bahnhof Jungfernheide\r\n', 4);;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `termine`
--
ALTER TABLE `termine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategorie` (`kategorie`),
  ADD KEY `kategorie_2` (`kategorie`),
  ADD KEY `kategorie_3` (`kategorie`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `termine`
--
ALTER TABLE `termine`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `termine`
--
ALTER TABLE `termine`
  ADD CONSTRAINT `termine_ibfk_1` FOREIGN KEY (`kategorie`) REFERENCES `kategorien` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
