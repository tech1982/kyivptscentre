import { useState, useCallback } from "react";

// ===== i18n TRANSLATIONS =====
const T = {
  ua: {
    logoSub: "ПНЕВМОПОШТА · ЧЕРГИ · ДЕПОЗИТАРІЙ",
    heroTag: "На ринку України з 2005 року",
    heroTitle: "Інженерні рішення для автоматизації бізнес-процесів",
    heroDesc: "Проєктуємо, постачаємо й обслуговуємо системи пневматичної пошти, електронні системи керування чергою та депозитарне обладнання для банків і торговельних мереж.",
    heroCta: "Зв'язатися з нами",
    heroCtaSec: "Наші рішення",
    stats: [{ num: "30+", label: "реалізованих проєктів" }, { num: "5+", label: "регіонів України" }, { num: "20+", label: "років досвіду" }, { num: "5", label: "міжнародних партнерів" }],
    solTag: "Напрямки", solTitle: "Три ключові рішення для вашого бізнесу", solSub: "Ми пропонуємо комплексні рішення, перевірені провідними європейськими виробниками та адаптовані під потреби українського ринку.",
    solutions: [
      { icon: "tube", title: "Пневматична пошта", desc: "Швидка доставка документів, грошей, аналізів та дрібних вантажів до 1 кг зі швидкістю до 8 м/с трубопроводами. Ідеальна для банків, лікарень, торговельних центрів.", accent: "#0A4D68" },
      { icon: "queue", title: "Керування чергою", desc: "Електронні системи, що організовують потік клієнтів: від реєстрації та видачі талона до виклику до потрібного вікна.", accent: "#E8913A" },
      { icon: "safe", title: "Депозитарне зберігання", desc: "Професійне обладнання для безпечного зберігання цінностей: сейфові двері, сховища, депозитні скриньки від шведського виробника Robur Safe.", accent: "#2D8B55" },
    ],
    howTag: "Як це працює", howTitle: "Пневмопошта — просто про складне",
    howP1: "Уявіть, що у вас є **станція відправлення** (наприклад, каса) і **станція прийому** (наприклад, кабінет керівника), з'єднані трубою. До труби підключено повітряний насос, що працює у двох режимах: всмоктування та нагнітання.",
    howP2: "Ви кладете документ або гроші у спеціальну **капсулу**, вставляєте її в станцію, обираєте адресу — і капсула мчить до отримувача зі швидкістю до 8 м/с. Весь процес займає лічені секунди.",
    howP3: "Сучасні системи повністю автоматизовані: маршрутизація здійснюється програмно, кожне відправлення відстежується, а на 16-дюймовому LCD-дисплеї можна бачити статус у реальному часі.",
    partTag: "Партнери", partTitle: "Працюємо з провідними світовими брендами", partnerSite: "Сайт партнера",
    ctaTitle: "Потрібна консультація?", ctaSub: "Ми підберемо оптимальне рішення для вашого об'єкта", ctaBtn: "Контакти та розташування",
    more: "Детальніше",
    home: "Головна", pneumo: "Пневмопошта", queue: "Керування чергою", depository: "Депозитарій", news: "Новини", support: "Підтримка", faq: "FAQ", contacts: "Контакти",
    pneumoSub: ["Огляд","Сфери застосування","Типи систем","Типи станцій","Обладнання","Аксесуари","Капсули","ПЗ керування"],
    queueSub: ["Огляд","Сфери застосування","Типи систем","Реєстрація клієнтів","Інформаційні табло","Кнопковий виклик","Аксесуари","ПЗ керування"],
    pnTitle: "Системи пневматичного транспорту", pnSub: "Надійна та швидка доставка документів і дрібних вантажів усередині будівель — від виробника Sumetzberger (Австрія).",
    pnIntro: "Система пневматичної пошти — це інженерне рішення для автоматичної доставки документів, грошей, аналізів, ключів та інших предметів вагою до 1 кг. Капсули рухаються трубопроводами зі швидкістю до 8 м/с на відстань до 600 метрів.",
    pnWhere: "Де застосовується:", pnWhereList: "банки та фінансові установи, супермаркети й торговельні мережі, лікарні та лабораторії, промислові підприємства, офіси з розгалуженою структурою.",
    pnAdvTitle: "Основні переваги",
    pnAdv: ["Миттєва доставка документів, грошей та дрібних вантажів до 1 кг","Швидкість до 8 м/с — швидше за будь-якого кур'єра","Повністю автоматизована маршрутизація","Моніторинг кожного відправлення на LCD-дисплеях у реальному часі","Програмне керування з можливістю інтеграції в корпоративні системи","Мінімальне обслуговування — системи розраховані на довгі роки роботи","Високий рівень безпеки — парольний захист станцій та шифрування даних","Підходить як для нових об'єктів, так і для реконструкції існуючих будівель"],
    pnMfr: "Виробник: Sumetzberger GMBH (Австрія)",
    paTitle: "Сфери застосування", paIntro: "Пневмопошта використовується всюди, де потрібна швидка та безпечна пересилка фізичних предметів між підрозділами.",
    paItems: [{ t: "Банки та фінанси", d: "Пересилка грошей між касами та сховищами, передача документів на підпис, відправка ключів від скриньок." },{ t: "Торговельні мережі", d: "Інкасація виручки з кас, обмін документами з бухгалтерією. Metro Cash&Carry — один із наших найбільших клієнтів." },{ t: "Медичні заклади", d: "Доставка аналізів у лабораторію, пересилка рецептів і медикаментів між відділеннями." },{ t: "Промислові підприємства", d: "Швидкий обмін технічною документацією, зразками продукції, запчастинами між цехами й офісом." }],
    psTitle: "Типи систем", psIntro: "Ми пропонуємо кілька типів систем пневмопошти, що відрізняються за складністю та кількістю станцій.",
    psItems: [{ t: "Точка-Точка (SB1001)", d: "Найпростіша конфігурація з двома станціями. Ідеальна для зв'язку двох ключових точок." },{ t: "Лінійна система", d: "Кілька станцій, з'єднаних послідовно. Підходить для об'єктів із лінійним плануванням." },{ t: "Багатоадресна система", d: "Розгалужена мережа з автоматичною маршрутизацією." },{ t: "Комбінована система", d: "Поєднання різних типів трубопроводів (110 мм і 160 мм) для різних типів вантажів." }],
    pstTitle: "Типи станцій", pstIntro: "Станції — це точки відправлення та отримання капсул.",
    pstItems: [{ t: "Компактна станція DIANA (ÖR 20.000)", d: "Настільна модель для офісних приміщень. Автоматичний прийом і відправка, LCD-дисплей." },{ t: "Стандартна багатоадресна станція", d: "Для зон із високою прохідністю. Підтримує чергу відправлень і парольний захист." },{ t: "Станція з парольним доступом", d: "Для роботи з цінностями. Вилучення капсули лише після введення пароля." },{ t: "Станція автоматичного сортування", d: "Для великих вузлів. Автоматично спрямовує капсули за маршрутами." }],
    peTitle: "Загальне обладнання", peIntro: "Крім станцій, система включає обов'язкові компоненти:",
    peItems: ["Повітродувки (компресори) — створюють повітряний потік","Трубопроводи діаметром 110 або 160 мм","Перемикачі напрямку — маршрутизують капсули автоматично","Контролери керування — координують роботу всіх компонентів","Діагностичні модулі — стежать за станом системи"],
    paccTitle: "Аксесуари", paccIntro: "Додаткове обладнання для розширення функціональності:",
    paccItems: ["Комбінований екранований кабель для зв'язку між станціями","Шафи-стійки для зберігання капсул","Кронштейни для кріплення станцій","Спеціальні штативи для медичних пробірок","Фіксувальні пристрої для вмісту капсул","Захисні сумки для крихких вантажів"],
    pcTitle: "Транспортувальні капсули", pcIntro: "Капсули — це герметичні контейнери для вантажів:",
    pcItems: [{ t: "Стандартна капсула (NW 110)", d: "Для документів A4, грошей, ключів. Діаметр 110 мм. Вага до 0,5 кг." },{ t: "Збільшена капсула (NW 160)", d: "Для більших предметів. Діаметр 160 мм. Вага до 1 кг." },{ t: "Капсула для гарячих матеріалів (CARRIER STEEL NW75)", d: "Металева капсула для гарячих або хімічно активних матеріалів." }],
    pswTitle: "Програмне забезпечення", pswIntro: "Спеціалізоване ПЗ для повного контролю системи:",
    pswItems: ["Керування маршрутизацією та пріоритетами відправлень","Моніторинг стану станцій у реальному часі","Журнал відправлень із фіксацією часу та статусів","Діагностика несправностей та повідомлення про помилки","Статистика й аналітика завантаження системи","Віддалений доступ через Internet та локальну мережу","Інтеграція з корпоративними системами"],
    pswLink: "Технічна підтримка",
    qTitle: "Системи електронного керування чергою", qSub: "Сучасне рішення для організації потоку відвідувачів.",
    qIntro: "Електронна система керування чергою (QMS) — це комплекс обладнання та ПЗ, що організовує прийом відвідувачів: від реєстрації до завершення обслуговування.",
    qHowTitle: "Як це працює",
    qSteps: [{ s: "1", t: "Реєстрація", d: "Клієнт підходить до терміналу, обирає послугу та отримує талон з номером черги." },{ s: "2", t: "Очікування", d: "Клієнт чекає у зоні відпочинку. На табло — номери поточних талонів." },{ s: "3", t: "Виклик", d: "Оператор натискає кнопку виклику. На табло — номер талона й номер вікна." },{ s: "4", t: "Обслуговування", d: "Клієнт підходить до вказаного вікна. Статистика фіксується автоматично." }],
    qResTitle: "Результати впровадження",
    qRes: ["Скорочення суб'єктивного часу очікування","Рівномірний розподіл навантаження між операторами","Детальна статистика обслуговування","Підвищення задоволеності клієнтів","Можливість пріоритезації VIP-клієнтів"],
    qaTitle: "Сфери застосування", qaIntro: "Системи керування чергою застосовуються в організаціях будь-якого масштабу:",
    qaItems: [{ t: "Банки та фінансові установи", d: "Організація прийому клієнтів у відділеннях." },{ t: "Державні установи", d: "Центри надання адміністративних послуг, податкові інспекції." },{ t: "Медичні заклади", d: "Реєстратури поліклінік, приймальні покої." },{ t: "Телекомунікації та рітейл", d: "Салони зв'язку, магазини електроніки, страхові компанії." }],
    qsTitle: "Типи систем", qsIntro: "Різні конфігурації залежно від масштабу:",
    qsItems: [{ t: "Базова (до 5 вікон)", d: "Простий термінал, кілька LED-табло, кнопки виклику." },{ t: "Стандартна (5–20 вікон)", d: "Сенсорний кіоск, головне табло, індивідуальні дисплеї." },{ t: "Розширена (20+ вікон)", d: "Мультизональна архітектура, централізоване керування, CRM-інтеграція." }],
    qrTitle: "Реєстрація клієнтів", qrIntro: "Перша точка взаємодії клієнта з системою:",
    qrItems: ["Сенсорний екран з наочним меню послуг","Друк талона з номером та часом очікування","Можливість попереднього запису онлайн","Ідентифікація VIP-клієнтів за QR-кодом","Адаптивний інтерфейс для людей з обмеженими можливостями"],
    qdTitle: "Інформаційні табло", qdIntro: "Візуальне та звукове інформування клієнтів:",
    qdItems: [{ t: "Головне зведене табло", d: "Відображає кілька поточних викликів одночасно." },{ t: "Дисплей біля вікна", d: "Показує номер поточного талона." },{ t: "LED-біжучий рядок", d: "Додатковий засіб оповіщення та реклами." }],
    qcTitle: "Кнопковий виклик", qcIntro: "Пристрої виклику на робочому місці оператора:",
    qcItems: ["Апаратна кнопкова панель (Наступний, Повтор, Пауза)","Програмний інтерфейс із розширеними функціями","Переадресація клієнта до іншого вікна","Індикація кількості клієнтів, що очікують","Автоматичний режим «Вікно закрите»"],
    qaccTitle: "Аксесуари", qaccIntro: "Додаткове обладнання:",
    qaccItems: ["Кронштейни для кіосків реєстрації","Принтери термодруку для талонів","Звукові сигналізатори","Стійки зі стрічками для розділення потоків","Рекламні панелі"],
    qswTitle: "Програмне забезпечення", qswIntro: "Повний цикл управління та аналітики:",
    qswItems: ["Налаштування категорій послуг і пріоритетів","Моніторинг завантаження вікон","Статистичні звіти","Інтеграція з CRM/ERP через API","Віддалене керування філіями","Багатомовний інтерфейс"],
    depTitle: "Професійне обладнання для зберігання цінностей", depSub: "Сейфові двері, сховища та депозитні скриньки від Robur Safe (Швеція).",
    depIntro: "Компанія «Київ-PTS-Центр» постачає та встановлює депозитарне обладнання найвищого класу захисту від Robur Safe (Швеція).", depOffer: "Що ми пропонуємо",
    depItems: ["Сейфові двері класу Grade V","Сховища «під ключ»","Депозитні скриньки різних розмірів","Системи контролю доступу — біометрія, електронні замки, відеоспостереження","Професійний монтаж і обслуговування"],
    depMfr: "Виробник: Robur Safe (Швеція)",
    newsTitle: "Публікації та події",
    newsItems: [
      { date: "Травень 2007", title: "Стаття «Як налагодити контроль за допомогою електронного керування чергою»", desc: "У журналі «Бізнес» №1 за 2007 р. опублікована наша стаття.", link: { url: "http://pts-centre.kiev.ua/source/QControlPromotionPage.pdf", label: "Завантажити PDF" } },
      { date: "Січень 2007", title: "Відкрито «Гостьову книгу»", desc: "Для зручності зворотного зв'язку з клієнтами." },
      { date: "Грудень 2006", title: "Розділ «Підтримка» оновлено", desc: "Додано доступ до FTP-сервера та оновлені драйвери." },
      { date: "Грудень 2006", title: "Стаття в «Корпоративних системах» №6", desc: "Огляд досвіду впровадження для Metro Cash&Carry.", link: { url: "http://pts-centre.kiev.ua/source/CorporateSystems_6_2006.pdf", label: "Завантажити PDF" } },
      { date: "Жовтень 2006", title: "Виставка «Corporate & Banking Systems 2006»", desc: "Участь у XI міжнародній спеціалізованій виставці." },
    ],
    supTitle: "Технічна документація та завантаження", supSub: "Драйвери, документація та FTP-доступ.",
    supText: "Рекомендуємо використовувати сучасний браузер (Chrome, Firefox, Edge).", supFtp: "Перейти на FTP-сервер", supHttps: "Захищений доступ (HTTPS)",
    supHelp: "Потрібна допомога?", supHelpText: "Зв'яжіться з нами за телефоном", supOr: "або напишіть на",
    faqTitle: "Часті запитання", faqSub: "Відповіді на найпоширеніші запитання. Якщо вашого питання немає — зв'яжіться з нами.",
    faqs: [
      { q: "Яка максимальна дальність системи?", a: "Модель SU-6 забезпечує транспортування до 380 м. Для довших маршрутів (до 600 м) — проміжні повітродувки." },
      { q: "Чи можна розширити існуючу систему?", a: "Так. Потрібно перерахувати пропускну здатність і додати нові станції та трубопроводи." },
      { q: "Який тиск використовується?", a: "Від 0,5 до 1 бар — достатньо для капсул до 1 кг на швидкості до 8 м/с." },
      { q: "Що робити, якщо капсула застрягла?", a: "Система автоматично змінює напрямок потоку. Також є ревізійні люки для ручного доступу." },
      { q: "Скільки коштує мінімальна система?", a: "Базова «точка-точка» — від 2 800 EUR. Кінцева вартість залежить від конфігурації." },
      { q: "Чи можна між будівлями?", a: "Так — у підземних переходах, кабельних каналах або по естакадах." },
      { q: "Який рівень шуму?", a: "Повітродувку встановлюють у технічному приміщенні. На робочому місці — до 45 дБ." },
      { q: "Чи можна комбінувати обладнання різних виробників?", a: "За сумісності — так. Але для гарантії рекомендуємо одного виробника." },
    ],
    conTitle: "Зв'яжіться з нами", conCompany: "ТОВ «Київ-ПІТІЕС-Центр»", conAddr: "04119, Київ, вул. Дегтярівська, 15, офіс 2", conSchedule: "Пн–Пт 10:00 — 18:00",
    conDemo: "З питань демонстрації обладнання просимо попередньо зателефонувати.",
    conGeoTitle: "Географія проєктів", conGeoIntro: "Понад 30 проєктів у різних регіонах України:",
    conCities: ["Київ","Дніпро","Харків","Хмельницький","Чернігів","Біла Церква"],
    conClients: "Серед клієнтів — Metro Cash & Carry, банки та медичні центри.",
    footDesc: "Системи пневматичного транспорту, електронні системи керування чергою та депозитарне обладнання. На ринку з 2005 року.", footSolutions: "Рішення", footContacts: "Контакти",
  },
  en: {
    logoSub: "PNEUMATIC MAIL · QUEUES · DEPOSITORY",
    heroTag: "Serving the Ukrainian market since 2005",
    heroTitle: "Engineering solutions for business process automation",
    heroDesc: "We design, supply and maintain pneumatic tube systems, electronic queue management systems and depository equipment for banks and retail chains.",
    heroCta: "Contact us", heroCtaSec: "Our solutions",
    stats: [{ num: "30+", label: "projects delivered" }, { num: "5+", label: "regions of Ukraine" }, { num: "20+", label: "years of experience" }, { num: "5", label: "international partners" }],
    solTag: "Solutions", solTitle: "Three key solutions for your business", solSub: "Comprehensive solutions verified by leading European manufacturers, adapted for the Ukrainian market.",
    solutions: [
      { icon: "tube", title: "Pneumatic tube mail", desc: "Fast delivery of documents, cash, lab samples and small items up to 1 kg at speeds up to 8 m/s. Ideal for banks, hospitals, shopping centres.", accent: "#0A4D68" },
      { icon: "queue", title: "Queue management", desc: "Electronic systems organising customer flow: from registration to calling to the right counter.", accent: "#E8913A" },
      { icon: "safe", title: "Depository storage", desc: "Professional equipment for secure storage: vault doors, strongrooms, safe deposit boxes by Robur Safe (Sweden).", accent: "#2D8B55" },
    ],
    howTag: "How it works", howTitle: "Pneumatic mail — simply explained",
    howP1: "Imagine a **sending station** (e.g. a cashier) and a **receiving station** (e.g. the manager's office) connected by a tube. An air pump works in two modes: suction and pressure.",
    howP2: "You place a document or cash into a **capsule**, insert it, select the destination — and it travels at up to 8 m/s. The whole process takes seconds.",
    howP3: "Modern systems are fully automated: software routing, shipment tracking, and real-time status on 16-inch LCD displays.",
    partTag: "Partners", partTitle: "Working with world-leading brands", partnerSite: "Partner website",
    ctaTitle: "Need a consultation?", ctaSub: "We'll find the optimal solution for your facility", ctaBtn: "Contacts & location",
    more: "Learn more",
    home: "Home", pneumo: "Pneumatic mail", queue: "Queue management", depository: "Depository", news: "News", support: "Support", faq: "FAQ", contacts: "Contacts",
    pneumoSub: ["Overview","Applications","System types","Station types","Equipment","Accessories","Capsules","Software"],
    queueSub: ["Overview","Applications","System types","Registration","Displays","Call buttons","Accessories","Software"],
    pnTitle: "Pneumatic tube transport systems", pnSub: "Reliable delivery of documents and small cargo inside buildings — by Sumetzberger (Austria).",
    pnIntro: "A pneumatic tube system delivers documents, cash, samples, keys and items up to 1 kg at up to 8 m/s over distances up to 600 m.",
    pnWhere: "Where it is used:", pnWhereList: "banks, supermarkets, hospitals, industrial enterprises, offices.",
    pnAdvTitle: "Key advantages",
    pnAdv: ["Instant delivery of documents, cash and items up to 1 kg","Speed up to 8 m/s — faster than any courier","Fully automated routing","Real-time monitoring on LCD displays","Software control with corporate integration","Minimal maintenance — built for many years","High security — password protection and encryption","Suitable for new builds and renovations"],
    pnMfr: "Manufacturer: Sumetzberger GMBH (Austria)",
    paTitle: "Application areas", paIntro: "Pneumatic mail is used wherever fast physical item transfer is needed.",
    paItems: [{ t: "Banking & finance", d: "Cash transfer between tills and vaults, document signing, key delivery." },{ t: "Retail chains", d: "Cash collection from checkouts. Metro Cash&Carry is a key client." },{ t: "Healthcare", d: "Lab sample delivery, medication transfer between departments." },{ t: "Industrial facilities", d: "Fast exchange of documents, samples and spare parts." }],
    psTitle: "System types", psIntro: "Several types varying in complexity and station count:",
    psItems: [{ t: "Point-to-Point (SB1001)", d: "Simplest: two stations. Ideal for connecting two key points." },{ t: "Linear system", d: "Several stations in series for linear layouts." },{ t: "Multi-address system", d: "Branched network with automatic routing." },{ t: "Combined system", d: "Mix of 110 mm and 160 mm pipelines for different cargo." }],
    pstTitle: "Station types", pstIntro: "Stations are sending and receiving points for capsules.",
    pstItems: [{ t: "Compact DIANA (ÖR 20.000)", d: "Desktop model for offices. Auto send/receive, LCD, address keypad." },{ t: "Standard multi-address", d: "For high-traffic zones with queue and password support." },{ t: "Password-protected", d: "For valuables. Retrieval requires password." },{ t: "Automatic sorting", d: "For major hubs. Routes capsules automatically." }],
    peTitle: "General equipment", peIntro: "Essential system components besides stations:",
    peItems: ["Air blowers — generate airflow for capsule movement","Pipelines of 110 or 160 mm diameter","Direction switches for automatic routing","Control units coordinating all components","Diagnostic modules monitoring system status"],
    paccTitle: "Accessories", paccIntro: "Additional equipment:",
    paccItems: ["Shielded cable for station interconnection","Capsule storage racks","Mounting brackets for stations","Medical test tube holders for capsules","Content securing devices","Protective bags for fragile cargo"],
    pcTitle: "Transport capsules", pcIntro: "Sealed containers carrying cargo through the system:",
    pcItems: [{ t: "Standard (NW 110)", d: "For A4 documents, cash, keys. 110 mm, up to 0.5 kg." },{ t: "Enlarged (NW 160)", d: "For larger items. 160 mm, up to 1 kg." },{ t: "Hot material (CARRIER STEEL NW75)", d: "Metal capsule for hot or chemically active materials." }],
    pswTitle: "Control software", pswIntro: "Specialised software for full system control:",
    pswItems: ["Routing and priority management","Real-time station monitoring","Shipment log with timestamps","Fault diagnostics and alerts","Usage statistics and analytics","Remote access via Internet/LAN","Corporate system integration"],
    pswLink: "Technical support",
    qTitle: "Electronic queue management systems", qSub: "Organising visitor flow from entry to service.",
    qIntro: "A QMS is hardware and software that organises visitor reception from registration to service completion.",
    qHowTitle: "How it works",
    qSteps: [{ s: "1", t: "Registration", d: "Client selects a service on the touchscreen and receives a numbered ticket." },{ s: "2", t: "Waiting", d: "Client waits in the lounge. Displays show current ticket numbers." },{ s: "3", t: "Call", d: "Operator presses the call button. Display shows ticket and counter number." },{ s: "4", t: "Service", d: "Client goes to the indicated counter. Statistics are logged automatically." }],
    qResTitle: "Implementation results",
    qRes: ["Reduced perceived waiting time","Even workload distribution","Detailed service statistics","Improved customer satisfaction","VIP client prioritisation"],
    qaTitle: "Application areas", qaIntro: "Used in organisations of any scale:",
    qaItems: [{ t: "Banks", d: "Client reception in branches." },{ t: "Government agencies", d: "Administrative service centres, tax offices." },{ t: "Healthcare", d: "Clinic reception desks, ERs." },{ t: "Telecoms & retail", d: "Phone shops, electronics stores." }],
    qsTitle: "System types", qsIntro: "Different configurations by scale:",
    qsItems: [{ t: "Basic (up to 5 counters)", d: "Simple terminal, LED displays, call buttons." },{ t: "Standard (5–20 counters)", d: "Touchscreen kiosk, main display, counter screens." },{ t: "Extended (20+)", d: "Multi-zone architecture, centralised control, CRM integration." }],
    qrTitle: "Client registration", qrIntro: "First interaction with the system:",
    qrItems: ["Touchscreen with intuitive service menu","Ticket printing with number and wait time","Online pre-booking","VIP identification by QR code","Accessible interface"],
    qdTitle: "Information displays", qdIntro: "Visual and audio client notifications:",
    qdItems: [{ t: "Main summary display", d: "Shows multiple active calls simultaneously." },{ t: "Counter display", d: "Shows current ticket at each counter." },{ t: "LED scrolling line", d: "Additional notification and advertising tool." }],
    qcTitle: "Call buttons", qcIntro: "Operator workstation call devices:",
    qcItems: ["Hardware button panel (Next, Repeat, Pause)","Software interface with extended functions","Client redirect to another counter","Waiting client count indicator","Automatic 'Counter closed' mode"],
    qaccTitle: "Accessories", qaccIntro: "Additional equipment:",
    qaccItems: ["Kiosk mounting brackets","Thermal ticket printers","Audio alert devices","Queue barrier posts with belts","Advertising panels"],
    qswTitle: "Control software", qswIntro: "Full management and analytics cycle:",
    qswItems: ["Service category and priority configuration","Real-time counter monitoring","Statistical reports","CRM/ERP integration via API","Remote multi-branch management","Multilingual interface"],
    depTitle: "Professional secure storage equipment", depSub: "Vault doors, strongrooms and safe deposit boxes by Robur Safe (Sweden).",
    depIntro: "Kyiv-PTS-Centre supplies and installs top-grade depository equipment from Robur Safe (Sweden).", depOffer: "What we offer",
    depItems: ["Grade V vault doors","Turnkey strongrooms","Safe deposit boxes in various sizes","Access control — biometrics, electronic locks, CCTV","Professional installation and maintenance"],
    depMfr: "Manufacturer: Robur Safe (Sweden)",
    newsTitle: "Publications & events",
    newsItems: [
      { date: "May 2007", title: "Article on electronic queue management", desc: "Published in Business magazine #1, 2007.", link: { url: "http://pts-centre.kiev.ua/source/QControlPromotionPage.pdf", label: "Download PDF" } },
      { date: "Jan 2007", title: "Guestbook launched", desc: "For convenient client feedback." },
      { date: "Dec 2006", title: "Support section updated", desc: "FTP access and updated drivers added." },
      { date: "Dec 2006", title: "Article in Corporate Systems #6", desc: "Metro Cash&Carry deployment review.", link: { url: "http://pts-centre.kiev.ua/source/CorporateSystems_6_2006.pdf", label: "Download PDF" } },
      { date: "Oct 2006", title: "Corporate & Banking Systems 2006", desc: "Participation in the XI international exhibition." },
    ],
    supTitle: "Technical documentation & downloads", supSub: "Drivers, documentation and FTP access.",
    supText: "Use a modern browser (Chrome, Firefox, Edge) for downloads.", supFtp: "Go to FTP server", supHttps: "Secure access (HTTPS)",
    supHelp: "Need help?", supHelpText: "Contact us at", supOr: "or email",
    faqTitle: "Frequently asked questions", faqSub: "If your question isn't here — contact us.",
    faqs: [
      { q: "Maximum system range?", a: "SU-6 model: up to 380 m. Longer routes (up to 600 m) use intermediate blowers." },
      { q: "Can an existing system be expanded?", a: "Yes. Blower capacity is recalculated and new stations/pipelines added." },
      { q: "What pressure is used?", a: "0.5–1 bar, sufficient for capsules up to 1 kg at up to 8 m/s." },
      { q: "Capsule stuck?", a: "The system auto-reverses airflow. Inspection hatches provide manual access." },
      { q: "Basic system cost?", a: "Point-to-point from approx. EUR 2,800. Final cost depends on configuration." },
      { q: "Between buildings?", a: "Yes — underground passages, cable channels or open catwalks." },
      { q: "Noise level?", a: "Blower is in a technical room. Operator workstation: under 45 dB." },
      { q: "Mix manufacturers?", a: "If compatible, yes. We recommend single-manufacturer solutions for warranty." },
    ],
    conTitle: "Get in touch", conCompany: "Kyiv-PTS-Centre LLC", conAddr: "04119, Kyiv, 15 Dehtyarivska St., office 2", conSchedule: "Mon–Fri 10:00 AM — 6:00 PM",
    conDemo: "To arrange a showroom demonstration, please call ahead.",
    conGeoTitle: "Project geography", conGeoIntro: "Over 30 projects across Ukraine:",
    conCities: ["Kyiv","Dnipro","Kharkiv","Khmelnytskyi","Chernihiv","Bila Tserkva"],
    conClients: "Clients include Metro Cash & Carry, banks and medical centres.",
    footDesc: "Pneumatic tube systems, electronic queue management and depository equipment. Since 2005.", footSolutions: "Solutions", footContacts: "Contacts",
  },
};
const PARTNERS = [
  { name: "Sumetzberger", country: { ua: "Австрія", en: "Austria" }, url: "http://www.sumetzberger.at", desc: { ua: "Пневматичний транспорт", en: "Pneumatic transport" } },
  { name: "Q-Net", country: { ua: "Угорщина", en: "Hungary" }, url: "http://www.q-net.com", desc: { ua: "Системи керування чергою", en: "Queue management" } },
  { name: "Aquis IT Solutions", country: { ua: "Угорщина", en: "Hungary" }, url: "http://www.kioskhungary.eu", desc: { ua: "IT-рішення для кіосків", en: "Kiosk IT solutions" } },
  { name: "Robur Safe", country: { ua: "Швеція", en: "Sweden" }, url: "http://www.robursafe.com", desc: { ua: "Депозитарне обладнання", en: "Depository equipment" } },
  { name: "Metro Cash & Carry", country: { ua: "Німеччина", en: "Germany" }, url: "http://www.metro.ua", desc: { ua: "Ключовий клієнт", en: "Key client" } },
];
const C = { brand: "#0A4D68", brandLight: "#0E6B8F", brandDark: "#083A50", accent: "#E8913A", bg: "#F7F6F3", card: "#FFFFFF", text: "#1A1A1A", textMuted: "#5A5A5A", textLight: "#8A8A8A", border: "#E2E0DC", borderLight: "#EDEBE7", success: "#2D8B55" };
const PN_SUBS = ["pneumo","pneumo-areas","pneumo-systems","pneumo-stations","pneumo-equipment","pneumo-accessories","pneumo-capsules","pneumo-software"];
const Q_SUBS = ["queue","queue-areas","queue-systems","queue-registration","queue-displays","queue-call","queue-accessories","queue-software"];

// === Icons ===
function I({ n, s = 20 }) {
  const p = { tube:<><circle cx="12" cy="12" r="4"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round"/></>, queue:<><rect x="3" y="5" width="4" height="14" rx="1"/><rect x="10" y="5" width="4" height="14" rx="1"/><rect x="17" y="5" width="4" height="14" rx="1"/></>, safe:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/></>, phone:<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.7 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.75.34 1.54.57 2.35.7A2 2 0 0122 16.92z"/>, mail:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></>, pin:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>, arrow:<path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>, download:<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>, clock:<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/></>, check:<path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>, menu:<path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>, close:<path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>, ext:<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>, chevDown:<path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/> };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={n==="check"?"2":"1.5"}>{p[n]}</svg>;
}

// === Shared ===
const Bold = ({ text }) => { const parts = text.split(/\*\*(.*?)\*\*/g); return <>{parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p)}</>; };
const ST = ({ tag, title, sub }) => <div style={{ marginBottom: 32 }}>{tag && <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{tag}</div>}<h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.3 }}>{title}</h2>{sub && <p style={{ fontSize: 15, color: C.textMuted, marginTop: 8, lineHeight: 1.6, maxWidth: 600 }}>{sub}</p>}</div>;
const FL = ({ items }) => <div style={{ display: "grid", gap: 12 }}>{items.map((x, i) => <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div style={{ marginTop: 2, color: C.success, flexShrink: 0 }}><I n="check" s={18} /></div><p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: C.textMuted }}>{x}</p></div>)}</div>;
const EL = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.brand, textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14 }}>{children} <I n="ext" s={13} /></a>;
const DLk = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: `${C.brand}08`, color: C.brand, border: `1px solid ${C.brand}20`, textDecoration: "none" }}><I n="download" s={16} /> {children}</a>;
const BC = ({ items, setPage, t }) => <div style={{ display: "flex", gap: 8, fontSize: 13, color: C.textLight, marginBottom: 24, flexWrap: "wrap" }}><button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: C.textLight, cursor: "pointer", padding: 0, fontSize: 13 }}>{t.home}</button>{items.map((x, i) => <span key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}><span>/</span>{x.onClick ? <button onClick={x.onClick} style={{ background: "none", border: "none", color: C.textLight, cursor: "pointer", padding: 0, fontSize: 13 }}>{x.label}</button> : <span style={{ color: C.text, fontWeight: 500 }}>{x.label}</span>}</span>)}</div>;
const PL = ({ children, sidebar }) => <div style={{ display: "grid", gridTemplateColumns: sidebar ? "220px 1fr" : "1fr", gap: 32, maxWidth: 1100, margin: "0 auto", padding: "32px 20px 64px" }} className="pl">{sidebar}<div>{children}</div><style>{`@media(max-width:768px){.pl{grid-template-columns:1fr!important}}`}</style></div>;
const SN = ({ items, active, setPage, label }) => <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 8, marginBottom: 32 }} className="sn"><div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: "uppercase", letterSpacing: 1.5, padding: "8px 12px 4px" }}>{label}</div>{items.map(x => <button key={x.id} onClick={() => setPage(x.id)} style={{ display: "block", width: "100%", textAlign: "left", background: active === x.id ? `${C.brand}10` : "transparent", color: active === x.id ? C.brand : C.textMuted, border: "none", padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: active === x.id ? 600 : 400 }}>{x.label}</button>)}<style>{`@media(max-width:768px){.sn{display:none}}`}</style></div>;
const IG = ({ items }) => <div style={{ display: "grid", gap: 16, marginTop: 24 }}>{items.map((x, i) => <div key={i} style={{ background: C.bg, borderRadius: 12, padding: "20px 24px" }}><h4 style={{ margin: "0 0 8px", fontSize: 16, color: C.text }}>{x.t}</h4><p style={{ margin: 0, fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{x.d}</p></div>)}</div>;
const Cd = ({ icon, title, desc, onClick, accent }) => <div onClick={onClick} style={{ background: C.card, borderRadius: 12, padding: "28px 24px", border: `1px solid ${C.border}`, cursor: onClick ? "pointer" : "default", transition: "all 0.2s" }} onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = accent || C.accent; e.currentTarget.style.transform = "translateY(-2px)"; } }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>{icon && <div style={{ width: 44, height: 44, borderRadius: 10, background: `${accent || C.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: accent || C.accent, marginBottom: 16 }}><I n={icon} s={22} /></div>}<h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px", color: C.text }}>{title}</h3><p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{desc}</p></div>;

// === Header ===
function Header({ page, setPage, lang, setLang, t }) {
  const [mo, setMo] = useState(false);
  const [os, setOs] = useState(null);
  const nav = [{ id: "home", label: t.home }, { id: "pneumo", label: t.pneumo, sub: PN_SUBS.map((id, i) => ({ id, label: t.pneumoSub[i] })) }, { id: "queue", label: t.queue, sub: Q_SUBS.map((id, i) => ({ id, label: t.queueSub[i] })) }, { id: "depository", label: t.depository }, { id: "news", label: t.news }, { id: "support", label: t.support }, { id: "faq", label: t.faq }, { id: "contacts", label: t.contacts }];
  const isA = (x) => page === x.id || (x.sub && x.sub.some(s => s.id === page));
  return <header style={{ background: C.brand, color: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }} onClick={() => { setPage("home"); setMo(false); }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>PTS</div>
          <div><div style={{ fontWeight: 600, fontSize: 15, letterSpacing: 0.5 }}>Київ-PTS-Центр</div><div style={{ fontSize: 9, opacity: 0.7, letterSpacing: 0.5 }}>{t.logoSub}</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <nav style={{ display: "flex", gap: 2, fontSize: 13, fontWeight: 500 }} className="dn">{nav.map(x => <div key={x.id} style={{ position: "relative" }} onMouseEnter={() => x.sub && setOs(x.id)} onMouseLeave={() => setOs(null)}>
            <button onClick={() => { setPage(x.id); setOs(null); }} style={{ background: isA(x) ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3 }}>{x.label}{x.sub && <I n="chevDown" s={14} />}</button>
            {x.sub && os === x.id && <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: 220, padding: "6px 0", zIndex: 200 }}>{x.sub.map(s => <button key={s.id} onClick={() => { setPage(s.id); setOs(null); }} style={{ display: "block", width: "100%", textAlign: "left", background: page === s.id ? C.bg : "transparent", color: C.text, border: "none", padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: page === s.id ? 600 : 400 }}>{s.label}</button>)}</div>}
          </div>)}</nav>
          <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: 2 }}>{["ua","en"].map(l => <button key={l} onClick={() => setLang(l)} style={{ padding: "4px 10px", borderRadius: 4, border: "none", fontSize: 12, fontWeight: 600, background: lang === l ? "rgba(255,255,255,0.25)" : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", textTransform: "uppercase" }}>{l}</button>)}</div>
          <button onClick={() => setMo(!mo)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4, display: "none" }} className="mb"><I n={mo ? "close" : "menu"} s={24} /></button>
        </div>
      </div>
    </div>
    {mo && <div style={{ background: C.brandDark, padding: "12px 20px 20px" }} className="mn">{nav.map(x => <div key={x.id}><button onClick={() => { if (x.sub) setOs(os === x.id ? null : x.id); else { setPage(x.id); setMo(false); } }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "transparent", color: "#fff", border: "none", padding: "12px 0", fontSize: 15, fontWeight: 500, cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{x.label}{x.sub && <I n="chevDown" s={16} />}</button>{x.sub && os === x.id && <div style={{ paddingLeft: 16 }}>{x.sub.map(s => <button key={s.id} onClick={() => { setPage(s.id); setMo(false); setOs(null); }} style={{ display: "block", width: "100%", textAlign: "left", background: "transparent", color: "rgba(255,255,255,0.8)", border: "none", padding: "10px 0", fontSize: 14, cursor: "pointer" }}>{s.label}</button>)}</div>}</div>)}</div>}
    <style>{`@media(max-width:960px){.dn{display:none!important}.mb{display:block!important}}@media(min-width:961px){.mn{display:none!important}}`}</style>
  </header>;
}

function Footer({ setPage, t, lang }) {
  return <footer style={{ background: C.brandDark, color: "rgba(255,255,255,0.85)", padding: "48px 20px 32px" }}><div style={{ maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
      <div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Київ-PTS-Центр</div><p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.7 }}>{t.footDesc}</p></div>
      <div><div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>{t.footSolutions}</div>{[["pneumo",t.pneumo],["queue",t.queue],["depository",t.depository]].map(([id,l]) => <button key={id} onClick={() => setPage(id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.75)", padding: "4px 0", fontSize: 13, cursor: "pointer" }}>{l}</button>)}</div>
      <div><div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>{t.footContacts}</div><p style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.7 }}>{lang === "ua" ? "04119, Київ, вул. Дегтярівська, 15" : "04119, Kyiv, 15 Dehtyarivska St."}<br/>+380 44 501 21 71<br/>office@pts-centre.kiev.ua</p></div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}><div style={{ fontSize: 12, opacity: 0.5 }}>© 2005–2026 KYIV-PTS-CENTRE, Ltd.</div><div style={{ fontSize: 12, opacity: 0.5 }}>{t.conSchedule}</div></div>
  </div></footer>;
}

// === Pages ===
function Home({ setPage, t, lang }) {
  return <><section style={{ background: `linear-gradient(135deg, ${C.brand} 0%, ${C.brandLight} 100%)`, color: "#fff", padding: "80px 20px 72px", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} /><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}><div style={{ fontSize: 13, fontWeight: 600, opacity: 0.6, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{t.heroTag}</div><h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, margin: "0 0 20px", lineHeight: 1.2, maxWidth: 700 }}>{t.heroTitle}</h1><p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.85, maxWidth: 560, margin: "0 0 36px" }}>{t.heroDesc}</p><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><button onClick={() => setPage("contacts")} style={{ background: C.accent, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{t.heroCta}</button><button onClick={() => setPage("pneumo")} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>{t.heroCtaSec}</button></div></div></section>
    <section style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}><div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>{t.stats.map((s, i) => <div key={i} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}><div style={{ fontSize: 28, fontWeight: 700, color: C.brand }}>{s.num}</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{s.label}</div></div>)}</div></section>
    <section style={{ padding: "64px 20px", maxWidth: 1100, margin: "0 auto" }}><ST tag={t.solTag} title={t.solTitle} sub={t.solSub} /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>{t.solutions.map((s, i) => <Cd key={i} icon={s.icon} title={s.title} desc={s.desc} accent={s.accent} onClick={() => setPage(["pneumo","queue","depository"][i])} />)}</div></section>
    <section style={{ background: C.bg, padding: "64px 20px" }}><div style={{ maxWidth: 1100, margin: "0 auto" }}><ST tag={t.howTag} title={t.howTitle} /><div style={{ background: C.card, borderRadius: 16, padding: "32px 28px", border: `1px solid ${C.border}`, lineHeight: 1.8, fontSize: 15, color: C.textMuted }}><p style={{ margin: "0 0 16px" }}><Bold text={t.howP1} /></p><p style={{ margin: "0 0 16px" }}><Bold text={t.howP2} /></p><p style={{ margin: 0 }}><Bold text={t.howP3} /></p></div></div></section>
    <section style={{ padding: "64px 20px", maxWidth: 1100, margin: "0 auto" }}><ST tag={t.partTag} title={t.partTitle} /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>{PARTNERS.map((p, i) => <div key={i} style={{ background: C.bg, borderRadius: 12, padding: 20, border: `1px solid ${C.borderLight}` }}><div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 4 }}>{p.name}</div><div style={{ fontSize: 12, color: C.accent, fontWeight: 500, marginBottom: 8 }}>{p.country[lang]}</div><div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{p.desc[lang]}</div><EL href={p.url}>{t.partnerSite}</EL></div>)}</div></section>
    <section style={{ background: `linear-gradient(135deg, ${C.brandDark} 0%, ${C.brand} 100%)`, padding: "56px 20px", textAlign: "center", color: "#fff" }}><h2 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 12px" }}>{t.ctaTitle}</h2><p style={{ opacity: 0.75, marginBottom: 28, fontSize: 15 }}>{t.ctaSub}</p><button onClick={() => setPage("contacts")} style={{ background: C.accent, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{t.ctaBtn}</button></section>
  </>;
}

function PnP({ page, setPage, t }) {
  const si = PN_SUBS.map((id, i) => ({ id, label: t.pneumoSub[i] }));
  const pg = { pneumo:<><ST tag={t.pneumo} title={t.pnTitle} sub={t.pnSub}/><div style={{lineHeight:1.8,fontSize:15,color:C.textMuted}}><p>{t.pnIntro}</p><p><strong>{t.pnWhere}</strong> {t.pnWhereList}</p><h3 style={{fontSize:18,color:C.text,marginTop:32}}>{t.pnAdvTitle}</h3></div><FL items={t.pnAdv}/><div style={{marginTop:32}}><EL href="http://www.sumetzberger.at">{t.pnMfr}</EL></div></>,
    "pneumo-areas":<><ST tag={t.pneumo} title={t.paTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.paIntro}</p><IG items={t.paItems}/></>,
    "pneumo-systems":<><ST tag={t.pneumo} title={t.psTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.psIntro}</p><IG items={t.psItems}/></>,
    "pneumo-stations":<><ST tag={t.pneumo} title={t.pstTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.pstIntro}</p><IG items={t.pstItems}/></>,
    "pneumo-equipment":<><ST tag={t.pneumo} title={t.peTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.peIntro}</p><FL items={t.peItems}/></>,
    "pneumo-accessories":<><ST tag={t.pneumo} title={t.paccTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.paccIntro}</p><FL items={t.paccItems}/></>,
    "pneumo-capsules":<><ST tag={t.pneumo} title={t.pcTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.pcIntro}</p><IG items={t.pcItems}/></>,
    "pneumo-software":<><ST tag={t.pneumo} title={t.pswTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.pswIntro}</p><FL items={t.pswItems}/><div style={{marginTop:24}}><EL href="http://pts-centre.kiev.ua/support.htm">{t.pswLink}</EL></div></>,
  };
  return <PL sidebar={<SN items={si} active={page} setPage={setPage} label={t.pneumo}/>}><BC items={[{label:t.pneumo,onClick:()=>setPage("pneumo")},...(page!=="pneumo"?[{label:si.find(s=>s.id===page)?.label}]:[])]} setPage={setPage} t={t}/>{pg[page]||pg.pneumo}</PL>;
}

function QP({ page, setPage, t }) {
  const si = Q_SUBS.map((id, i) => ({ id, label: t.queueSub[i] }));
  const pg = { queue:<><ST tag={t.queue} title={t.qTitle} sub={t.qSub}/><div style={{lineHeight:1.8,fontSize:15,color:C.textMuted}}><p>{t.qIntro}</p><h3 style={{fontSize:18,color:C.text,marginTop:32,marginBottom:16}}>{t.qHowTitle}</h3><div style={{display:"grid",gap:16,marginBottom:24}}>{t.qSteps.map((x,i)=><div key={i} style={{display:"flex",gap:16,background:C.bg,borderRadius:12,padding:"20px 24px"}}><div style={{width:36,height:36,borderRadius:"50%",background:C.accent,color:"#fff",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{x.s}</div><div><h4 style={{margin:"0 0 6px",fontSize:16,color:C.text}}>{x.t}</h4><p style={{margin:0,fontSize:14,color:C.textMuted,lineHeight:1.6}}>{x.d}</p></div></div>)}</div><h3 style={{fontSize:18,color:C.text,marginBottom:16}}>{t.qResTitle}</h3></div><FL items={t.qRes}/><div style={{marginTop:24,display:"flex",gap:16,flexWrap:"wrap"}}><EL href="http://www.q-net.com">Q-Net Systems</EL><EL href="http://www.kioskhungary.eu">Aquis IT Solutions</EL></div></>,
    "queue-areas":<><ST tag={t.queue} title={t.qaTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qaIntro}</p><IG items={t.qaItems}/></>,
    "queue-systems":<><ST tag={t.queue} title={t.qsTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qsIntro}</p><IG items={t.qsItems}/></>,
    "queue-registration":<><ST tag={t.queue} title={t.qrTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qrIntro}</p><FL items={t.qrItems}/></>,
    "queue-displays":<><ST tag={t.queue} title={t.qdTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qdIntro}</p><IG items={t.qdItems}/></>,
    "queue-call":<><ST tag={t.queue} title={t.qcTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qcIntro}</p><FL items={t.qcItems}/></>,
    "queue-accessories":<><ST tag={t.queue} title={t.qaccTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qaccIntro}</p><FL items={t.qaccItems}/></>,
    "queue-software":<><ST tag={t.queue} title={t.qswTitle}/><p style={{fontSize:15,color:C.textMuted,lineHeight:1.8}}>{t.qswIntro}</p><FL items={t.qswItems}/></>,
  };
  return <PL sidebar={<SN items={si} active={page} setPage={setPage} label={t.queue}/>}><BC items={[{label:t.queue,onClick:()=>setPage("queue")},...(page!=="queue"?[{label:si.find(s=>s.id===page)?.label}]:[])]} setPage={setPage} t={t}/>{pg[page]||pg.queue}</PL>;
}

function DepP({ setPage, t }) { return <PL><BC items={[{label:t.depository}]} setPage={setPage} t={t}/><ST tag={t.depository} title={t.depTitle} sub={t.depSub}/><div style={{lineHeight:1.8,fontSize:15,color:C.textMuted}}><p>{t.depIntro}</p><h3 style={{fontSize:18,color:C.text,marginTop:32,marginBottom:16}}>{t.depOffer}</h3><FL items={t.depItems}/><div style={{marginTop:32}}><EL href="http://www.robursafe.com">{t.depMfr}</EL></div></div></PL>; }

function NewsP({ setPage, t }) { return <PL><BC items={[{label:t.news}]} setPage={setPage} t={t}/><ST tag={t.news} title={t.newsTitle}/><div style={{display:"grid",gap:20}}>{t.newsItems.map((x,i)=><div key={i} style={{background:C.card,borderRadius:12,padding:24,border:`1px solid ${C.border}`}}><div style={{fontSize:12,fontWeight:600,color:C.accent,marginBottom:8}}>{x.date}</div><h3 style={{fontSize:17,fontWeight:600,margin:"0 0 8px",color:C.text}}>{x.title}</h3><p style={{fontSize:14,color:C.textMuted,lineHeight:1.6,margin:0}}>{x.desc}</p>{x.link&&<div style={{marginTop:16}}><DLk href={x.link.url}>{x.link.label}</DLk></div>}</div>)}</div></PL>; }

function SupP({ setPage, t }) { return <PL><BC items={[{label:t.support}]} setPage={setPage} t={t}/><ST tag={t.support} title={t.supTitle} sub={t.supSub}/><div style={{background:C.bg,borderRadius:12,padding:28,border:`1px solid ${C.borderLight}`,marginBottom:24,lineHeight:1.8,fontSize:15,color:C.textMuted}}><p style={{margin:"0 0 16px"}}>{t.supText}</p><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><DLk href="ftp://pts-centre.kiev.ua/">{t.supFtp}</DLk><DLk href="https://pts-centre.kiev.ua/">{t.supHttps}</DLk></div></div><div style={{background:`${C.accent}10`,borderRadius:12,padding:"20px 24px",border:`1px solid ${C.accent}25`,fontSize:14,color:C.textMuted,lineHeight:1.6}}><strong style={{color:C.accent}}>{t.supHelp}</strong> {t.supHelpText} <strong>+380 44 501 21 71</strong> {t.supOr} <a href="mailto:office@pts-centre.kiev.ua" style={{color:C.brand}}>office@pts-centre.kiev.ua</a></div></PL>; }

function FaqP({ setPage, t }) { const [o, setO] = useState(null); return <PL><BC items={[{label:t.faq}]} setPage={setPage} t={t}/><ST tag="FAQ" title={t.faqTitle} sub={t.faqSub}/><div style={{display:"grid",gap:8}}>{t.faqs.map((f,i)=><div key={i} style={{background:C.card,borderRadius:12,border:`1px solid ${o===i?C.brand+"40":C.border}`,overflow:"hidden"}}><button onClick={()=>setO(o===i?null:i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"18px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:12}}><span style={{fontSize:15,fontWeight:500,color:C.text}}>{f.q}</span><span style={{color:C.textLight,flexShrink:0,transform:o===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}><I n="chevDown" s={18}/></span></button>{o===i&&<div style={{padding:"0 20px 18px",fontSize:14,lineHeight:1.7,color:C.textMuted}}>{f.a}</div>}</div>)}</div></PL>; }

function ConP({ setPage, t, lang }) { return <PL><BC items={[{label:t.contacts}]} setPage={setPage} t={t}/><ST tag={t.contacts} title={t.conTitle}/>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:24}}>
    <div><div style={{background:C.card,borderRadius:12,padding:28,border:`1px solid ${C.border}`,marginBottom:20}}><h3 style={{fontSize:17,fontWeight:600,margin:"0 0 20px",color:C.text}}>{t.conCompany}</h3>{[{icon:"pin",text:t.conAddr},{icon:"phone",text:"+380 44 501 21 71"},{icon:"phone",text:"+380 44 501 21 40"},{icon:"mail",text:"office@pts-centre.kiev.ua",link:"mailto:office@pts-centre.kiev.ua"},{icon:"clock",text:t.conSchedule}].map((x,i)=><div key={i} style={{display:"flex",gap:12,alignItems:"center",marginBottom:16}}><div style={{color:C.brand,flexShrink:0}}><I n={x.icon} s={18}/></div>{x.link?<a href={x.link} style={{fontSize:14,color:C.brand,textDecoration:"none"}}>{x.text}</a>:<span style={{fontSize:14,color:C.textMuted}}>{x.text}</span>}</div>)}</div><div style={{background:`${C.brand}08`,borderRadius:12,padding:"20px 24px",border:`1px solid ${C.brand}15`,fontSize:14,color:C.textMuted,lineHeight:1.6}}>{t.conDemo}</div></div>
    <div style={{background:C.bg,borderRadius:12,padding:24,border:`1px solid ${C.borderLight}`,display:"flex",flexDirection:"column",gap:16}}><h3 style={{fontSize:17,fontWeight:600,margin:0,color:C.text}}>{t.conGeoTitle}</h3><p style={{fontSize:14,color:C.textMuted,lineHeight:1.6,margin:0}}>{t.conGeoIntro}</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{t.conCities.map(c=><div key={c} style={{display:"flex",gap:8,alignItems:"center",fontSize:14,color:C.textMuted}}><div style={{width:6,height:6,borderRadius:"50%",background:C.accent}}/>{c}</div>)}</div><p style={{fontSize:13,color:C.textLight,margin:"8px 0 0"}}>{t.conClients}</p></div>
  </div>
</PL>; }

// === MAIN ===
export default function App() {
  const [page, setPageRaw] = useState("home");
  const [lang, setLang] = useState("ua");
  const t = T[lang];
  const setPage = useCallback((p) => { setPageRaw(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const r = () => {
    if (page === "home") return <Home setPage={setPage} t={t} lang={lang} />;
    if (page.startsWith("pneumo")) return <PnP page={page} setPage={setPage} t={t} />;
    if (page.startsWith("queue")) return <QP page={page} setPage={setPage} t={t} />;
    if (page === "depository") return <DepP setPage={setPage} t={t} />;
    if (page === "news") return <NewsP setPage={setPage} t={t} />;
    if (page === "support") return <SupP setPage={setPage} t={t} />;
    if (page === "faq") return <FaqP setPage={setPage} t={t} />;
    if (page === "contacts") return <ConP setPage={setPage} t={t} lang={lang} />;
    return <Home setPage={setPage} t={t} lang={lang} />;
  };
  return <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: C.text, background: C.bg, minHeight: "100vh" }}>
    <Header page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />
    <main>{r()}</main>
    <Footer setPage={setPage} t={t} lang={lang} />
  </div>;
}
