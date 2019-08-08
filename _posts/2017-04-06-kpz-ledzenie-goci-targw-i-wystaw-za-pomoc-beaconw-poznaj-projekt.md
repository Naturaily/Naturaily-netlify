---
title: 'KPZ: Śledzenie gości targów i wystaw za pomocą beaconów (poznaj projekt)'
description: >-
  Projekt KZP, aplikacja, której celem jest stworzenie systemu pozwalającego na
  śledzenie zainteresowanych stanowiskami na targach czy wystawach.
slug: kpz-projekt-sledzenie-uczestnikow-beacon
date: '2017-04-06 10:38:01 +0000'
category: Events
author: Marcin Sulikowski
avatar: marcin.jpg
image: kpz-1-sledzenie.jpg
text-preview: >-
  Celem projektu jest stworzenie systemu pozwalającego na śledzenie
  zainteresowanych stanowiskami na targach czy wystawach. Plan zakłada, że
  działanie systemu zostanie sprawdzone podczas czerwcowej Konferencji Projektów
  Zespołowych na Politechnice Wrocławskiej.
tags:
  - Beacony
  - Events
  - Ruby on Rails development
  - Native mobile development
---
Celem projektu jest stworzenie systemu pozwalającego na śledzenie zainteresowanych stanowiskami na targach czy wystawach. Plan zakłada, że działanie systemu zostanie sprawdzone podczas czerwcowej Konferencji Projektów Zespołowych na Politechnice Wrocławskiej.

### Na system będą się składać dwie aplikacje: **mobilna** i **internetowa**.

Pierwsza realizuje dwa zadania:

* odczytywanie odległości od każdego z beaconów znajdujących się na kolejnych ekspozycjach (zebrane dane są następnie przekazywane do aplikacji internetowej, przez którą są magazynowane i wykorzystywane do ustalenia przy której ekspozycji znajduje się odwiedzający),
* prezentacja użytkownikowi materiałów dotyczących aktualnie odwiedzanego stanowiska.

Druga:

* magazynuje dane pochodzące z aplikacji mobilnej i na ich podstawie określa przy której ekspozycji znajduje się użytkownik. Elementem aplikacji internetowej jest panel administracyjny pozwalający na sparowanie beaconów ze stoiskami na targach oraz dodanie materiałów promocyjnych do każdego ze stanowisk. Główną funkcjonalnością panelu administracyjnego jest prezentowanie zebranych statystyk odnośnie zainteresowania poszczególnymi ekspozycjami na targach np. liczba gości odwiedzających dane stanowisko lub średni czas przebywania użytkowników aplikacji przy kolejnych stanowiskach.

W projekcie zostaną wykorzystane udostępniane przez nas **Estimote Beacons**.
Aplikacja mobilna powstaje na **system Android**.
Aplikacja internetowa zostanie napisana w **Ruby on Rails**.

### Czas żebyście poznali grupę projektową oraz motywacje chłopaków do wyboru właśnie tego tematu.

* <p class="text-underline">Dawid Aksamski:</p>

_Wraz z kolegami uznaliśmy, że to naprawdę ciekawy temat. Mnie osobiście zachęciło to, że będę miał okazję poznać technologie, z którymi do tej pory nie miałem styczności._

* <p class="text-underline">Jan Luch:</p>

_Interesuję się zarówno platformą Android i rozwiązaniami IoT - stąd zainteresowanie właśnie tym tematem. Ponadto będziemy mieć okazję pracować z narzędziami, z których na co dzień korzystają zawodowi developerzy._

* <p class="text-underline">Kacper Kluka:</p>

_Podobnie jak Janek, mocno interesuję się Androidem oraz Beaconami. W tym projekcie podoba i się najbardziej to, że mogę się nauczyć języka Kotlin w praktyce._

* <p class="text-underline">Bartłomiej Pokutycki:</p>

_Wybrałem ten temat, ponieważ chciałem sprawdzić, jak w praktyce spisują się beacony polskiej produkcji. Ponadto mamy okazję popracować w większej grupie, nauczyć się nowych technologi (RoR) i, co najważniejsze, będziemy mogli przetestować gotową aplikację podczas prawdziwej konferencji (KPZ)._

<p>Prowadzącym jest <span class="text-underline">dr inż. Maciej Nikodem (INT)</span>, który w tymi słowami uargumentował skierowanie tego tematu do realizacji:</p>

_Osobiste zainteresowanie tematem lokalizacji wewnątrzbudynkowej (indoor localisation) związane z pracą naukową na uczelni, oraz fakt, że BLE to coraz powszechniejsza technologia w zastosowaniach "resale" oraz internetu (wszech)rzeczy. Spodziewam się, że w ciągu najbliższych kilku lat ta technologia będzie się dalej rozwijała w różnych zastosowaniach praktycznych (inteligentne sklepy, reklamy, rozszerzona rzeczywistość, itp.). Jest to też jedna z niewielu technologii, w których łatwo jest "dotknąć sprzętu" i stworzyć rozwiązanie, które nie jest tylko aplikacją komputerową. Z tego względu uważam, że studenci powinni mieć okazję praktycznego zapoznania się z nią w czasie swoich studiów._

Finał konferencji dopiero w czerwcu, w związku z czym zespół ma jeszcze sporo pracy przed sobą. Będziemy meldować o postępach w realizacji projektu.
