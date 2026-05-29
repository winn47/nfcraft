let currentUser = null;
let isAdmin = false;
let isSuperAdmin = false;

function initAuth() {
  const saved = localStorage.getItem('currentUser');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      // Super admin emailni frontend da ham tekshiramiz
      if (currentUser.email && currentUser.email.toLowerCase() === 'whatififlydidy@gmail.com') {
        currentUser.isAdmin = true;
        currentUser.isSuperAdmin = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      isAdmin = currentUser.isAdmin === true || currentUser.isAdmin === 1 || currentUser.isAdmin === 'true';
      isSuperAdmin = currentUser.isSuperAdmin === true || currentUser.isSuperAdmin === 1 || currentUser.isSuperAdmin === 'true';
    } catch (e) {
      console.error('Error loading user:', e);
      localStorage.removeItem('currentUser');
    }
  }
  updateAuthUI();
}

function updateAuthUI() {
  const loginBtn    = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const profileBtn  = document.getElementById('profileBtn');
  const logoutBtn   = document.getElementById('logoutBtn');
  const mLoginBtn    = document.getElementById('mLoginBtn');
  const mRegisterBtn = document.getElementById('mRegisterBtn');
  const mProfileBtn  = document.getElementById('mProfileBtn');
  const mLogoutBtn   = document.getElementById('mLogoutBtn');

  const orderButtons = document.querySelectorAll('.nav-cta, .btn-primary, .pricing-btn');

  const userManagementSection = document.getElementById('userManagement');
  const navUsersLink = document.getElementById('navUsersLink');

  const siteNav    = document.getElementById('siteNav');
  const siteFooter = document.getElementById('siteFooter');
  const adminDash  = document.getElementById('adminDashboard');

  if (currentUser && isAdmin) {
    if (siteNav)    siteNav.style.display    = 'none';
    if (siteFooter) siteFooter.style.display = 'none';
    if (adminDash)  adminDash.style.display  = 'block';
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    loadAdminDashboard();
  } else if (currentUser) {
    if (siteNav)    siteNav.style.display    = '';
    if (siteFooter) siteFooter.style.display = '';
    if (adminDash)  adminDash.style.display  = 'none';
    document.querySelectorAll('section').forEach(s => s.style.display = '');
    if (userManagementSection) userManagementSection.style.display = 'none';
    if (loginBtn)     loginBtn.style.display     = 'none';
    if (registerBtn)  registerBtn.style.display  = 'none';
    if (profileBtn)   profileBtn.style.display   = 'inline-block';
    if (logoutBtn)    logoutBtn.style.display     = 'inline-block';
    if (profileBtn)   profileBtn.textContent      = currentUser.firstName || 'Profile';
    if (mLoginBtn)    mLoginBtn.style.display     = 'none';
    if (mRegisterBtn) mRegisterBtn.style.display  = 'none';
    if (mProfileBtn)  mProfileBtn.style.display   = 'block';
    if (mLogoutBtn)   mLogoutBtn.style.display     = 'block';
    if (mProfileBtn)  mProfileBtn.textContent      = currentUser.firstName || 'Profile';
    orderButtons.forEach(btn => btn.style.display = '');
  } else {
    if (siteNav)    siteNav.style.display    = '';
    if (siteFooter) siteFooter.style.display = '';
    if (adminDash)  adminDash.style.display  = 'none';
    document.querySelectorAll('section').forEach(s => s.style.display = '');
    if (userManagementSection) userManagementSection.style.display = 'none';
    if (loginBtn)     loginBtn.style.display     = 'inline-block';
    if (registerBtn)  registerBtn.style.display  = 'inline-block';
    if (profileBtn)   profileBtn.style.display   = 'none';
    if (logoutBtn)    logoutBtn.style.display     = 'none';
    if (mLoginBtn)    mLoginBtn.style.display     = 'block';
    if (mRegisterBtn) mRegisterBtn.style.display  = 'block';
    if (mProfileBtn)  mProfileBtn.style.display   = 'none';
    if (mLogoutBtn)   mLogoutBtn.style.display     = 'none';
    orderButtons.forEach(btn => btn.style.display = '');
  }
}

let currentLang = 'en';

const LANG_META = {
  en: { code: 'EN' },
  uz: { code: 'UZ' },
  ru: { code: 'RU' },
};

const translations = {
  en: {
    navWhy: 'Why NFC', navPricing: 'Pricing', navTeam: 'Team', navLocation: 'Location', navUsers: 'Users',
    login: 'Login', register: 'Register', logout: 'Logout', getStarted: 'Get Started', signIn: 'Sign In',
    heroBadge: 'NFC Technology, Reimagined',
    heroTitle: 'Modern<br/><em>NFC Cards</em>',
    heroSub: 'Share your contact, portfolio, or links with a single tap. No app required.',
    orderNow: '⚡ Order Now', exploreCards: 'Explore Cards',
    howLabel: 'How It Works', howTitle: 'One tap. Everything shared.',
    howSub: 'Hold your card near any smartphone — your full profile opens instantly. No app, no QR scan, no typing.',
    howStep1Title: 'Order your card', howStep1Desc: 'Pick a plan and color. Your card arrives pre-programmed and ready to use — no setup needed.',
    howStep2Title: 'Add your info', howStep2Desc: 'Add your phone, socials, website — anything you want to share. Edit anytime from any browser.',
    howStep3Title: 'Tap & connect', howStep3Desc: 'Hold the card near any phone. Your profile appears in under a second — they save your contact instantly.',
    benefits: 'Benefits', whyNfc: 'Why NFC Cards?',
    whyNfcSub: 'A smarter way to share. Tap your card to any smartphone and instantly share anything.',
    instantSharing: 'Instant Sharing',
    instantDesc: 'One tap and your profile, links, or contact details are instantly on their phone.',
    noApps: 'No Apps Needed',
    noAppsDesc: 'NFC is built into every modern smartphone. No downloads, no setup — it just works.',
    worksEverywhere: 'Works Everywhere',
    worksDesc: 'Compatible with all modern Android and iOS devices. From budget phones to flagships.',
    ecoFriendly: 'Eco-Friendly',
    ecoDesc: 'Reusable and reprogrammable. Update what your card shares anytime, without printing new ones.',
    colorsLabel: 'Colors', colorsTitle: 'Pick Your Style',
    colorsSub: 'Every card ships in your chosen color. Same smart NFC chip — different personality.',
    pricing: 'Pricing', simplePricing: 'Simple Pricing',
    pickPlan: 'Pick a plan that fits your needs. Every card ships ready to use.',
    starter: 'Starter', starterDesc: 'Perfect for personal use or trying NFC for the first time.',
    orderStarter: 'Order Starter',
    pro: 'Pro', proDesc: 'For professionals who want a polished branded card.',
    orderPro: 'Order Pro',
    premiumTitle: 'Premium', premiumDesc: 'For businesses that want the best.',
    orderPremium: 'Order Premium',
    feat1Card: '1 NFC card', feat3Fields: 'Up to 3 fields', feat7Fields: 'Up to 7 fields', feat15Fields: 'Up to 15 fields',
    featBasicColor: 'Basic black or white', featReprogrammable: 'Reprogrammable',
    featStdShipping: 'Standard shipping', featAllColors: 'All colors available',
    featLogoPrint: 'Logo printing', featPriorityShip: 'Priority shipping',
    featCustomDesign: 'Custom design', featExpressShip: 'Express shipping',
    featDedicatedSupport: 'Dedicated support', bestChoice: 'Best Choice',
    foundersTitle: 'The Founders', foundersSub: 'The people behind NFCraft, dedicated to reimagining how professionals connect.',
    role1: 'CEO & Front End Developer', role2: 'CEO & Backend Developer',
    ourLocation: 'Our Location', locationSub: 'Come visit our studio and experience NFCraft cards in person. We\'re open weekdays 10am–6pm.',
    locAddressLabel: 'Address', locPhoneLabel: 'Phone', locEmailLabel: 'Email',
    modalTitle: 'Place Your Order', choosePlan: 'Choose Your Plan',
    planDetailStarter: 'Basic NFC card, 3 fields', planDetailPro: 'All colors + logo + 7 fields', planDetailPremium: 'Custom design + express + 15 fields',
    howMany: 'How many cards?', chooseColor: 'Choose Card Color', addonsOpts: 'Add-ons & Options',
    stepPlan: 'Plan', stepQty: 'Quantity', stepColor: 'Color', stepOptions: 'Options',
    labelPlanPrice: 'Plan price', labelSubtotal: 'Subtotal', labelQtyPrice: 'Qty × price', labelTotal: 'Total',
    colorBlack: 'Black', colorWhite: 'White', colorNavy: 'Navy', colorGold: 'Gold', colorForest: 'Wine', colorNeon: 'Neon',
    addonLogoName: 'Add Logo', addonLogoDesc: 'Print your logo on the card',
    addonDesignName: 'Custom Design', addonDesignDesc: 'Full custom artwork & layout',
    phoneLabel: 'Phone number', phoneRequired: 'Required for delivery', placeOrderBtn: 'Place Order →',
    account: 'Account', yourProfile: 'Your Profile', profileSub: 'Manage your account and view your orders.',
    yourOrders: 'Your Orders', noOrders: 'No orders yet.', cardOrders: 'Card Orders', noCardOrders: 'No card orders yet.',
    team: 'Team', location: 'Location',
    authTitle: 'Please Register to Order',
    authSub: 'Create a free account or sign in to complete your NFCraft order.',
    createAccount: 'Create Account & Order', signInBtn: 'Sign In & Continue',
    firstName: 'First Name', lastName: 'Last Name', age: 'Age', address: 'Address',
    gender: 'Gender', select: 'Select', male: 'Male', female: 'Female',
    emailLabel: 'Email', passwordLabel: 'Password',
    enterFirstName: 'Enter first name', enterLastName: 'Enter last name',
    enterAge: 'Enter age', enterAddress: 'Enter address',
    enterEmail: 'Enter email', enterPassword: 'Enter password',
    iltimosRejani: 'Please select a plan.',
    orderPlaced: 'Order Placed!',
    orderSuccess: 'Your NFCraft card is being crafted and will be delivered soon.',
    done: 'Done',
  },
  uz: {
    navWhy: 'Nima uchun NFC', navPricing: 'Narxlar', navTeam: 'Jamoa', navLocation: 'Manzil', navUsers: 'Foydalanuvchilar',
    login: 'Kirish', register: 'Ro\'yxatdan o\'tish', logout: 'Chiqish', getStarted: 'Boshlash', signIn: 'Kirish',
    heroBadge: 'NFC Texnologiyasi, Qayta Tasavvur Qilindi',
    heroTitle: 'Zamonaviy<br/><em>NFC Kartalar</em>',
    heroSub: 'Kontakt, portfolio yoki havolalarni bitta teginish orqali ulashing. Ilova talab qilinmaydi.',
    orderNow: '⚡ Hozir Buyurtma Bering', exploreCards: 'Rejalarni Ko\'rish',
    howLabel: 'Qanday Ishlaydi', howTitle: 'Bir teginish. Hamma narsa ulashildi.',
    howSub: 'Kartangizni istalgan smartfonga yaqin tuting — profilingiz bir zumda ochiladi. Ilova yo\'q, QR yo\'q, yozish kerak emas.',
    howStep1Title: 'Kartangizni buyurtma bering', howStep1Desc: 'Reja va rang tanlang. Kartangiz oldindan dasturlangan holda keladi — hech qanday sozlash shart emas.',
    howStep2Title: 'Ma\'lumotlaringizni kiriting', howStep2Desc: 'Telefon, ijtimoiy tarmoqlar, veb-sayt — baham ko\'rmoqchi bo\'lgan hamma narsani kiriting. Istalgan vaqt tahrirlang.',
    howStep3Title: 'Teging va bog\'laning', howStep3Desc: 'Kartani istalgan telefonga yaqin tuting. Profilingiz bir soniyada ochiladi — ular kontaktingizni darhol saqlaydi.',
    benefits: 'Afzalliklar', whyNfc: 'Nima uchun NFC Kartalar?',
    whyNfcSub: 'Ulashishning aqlliroq usuli. Kartangizni istalgan smartfonga teging va darhol hamma narsani ulashing.',
    instantSharing: 'Tezkor Ulashish',
    instantDesc: 'Bir teginish va profilingiz, havolalaringiz yoki aloqa ma\'lumotlaringiz darhol telefonida.',
    noApps: 'Ilova Kerak Emas',
    noAppsDesc: 'NFC har bir zamonaviy smartfonga o\'rnatilgan. Yuklab olish, sozlash yo\'q — darhol ishlaydi.',
    worksEverywhere: 'Hamma Joyda Ishlaydi',
    worksDesc: 'Barcha zamonaviy Android va iOS qurilmalar bilan mos keladi. Byudjet telefonlardan flagmanlargacha.',
    ecoFriendly: 'Ekologik',
    ecoDesc: 'Qayta ishlatilishi va qayta dasturlanishi mumkin. Yangilarini chop etmasdan istalgan vaqtda yangilang.',
    colorsLabel: 'Ranglar', colorsTitle: 'Rangingizni Tanlang',
    colorsSub: 'Har bir karta siz tanlagan rangda yetkaziladi. Xuddi o\'sha aqlli NFC chip — boshqacha ko\'rinish.',
    pricing: 'Narxlar', simplePricing: 'Sodda Narxlar',
    pickPlan: 'O\'zingizga mos rejani tanlang. Har bir karta foydalanishga tayyor holda yetkaziladi.',
    starter: 'Starter', starterDesc: 'Shaxsiy foydalanish yoki NFC ni birinchi marta sinab ko\'rish uchun ideal.',
    orderStarter: 'Starter Buyurtma',
    pro: 'Pro', proDesc: 'Sayqallangan brendlangan karta istaydigan mutaxassislar uchun.',
    orderPro: 'Pro Buyurtma',
    premiumTitle: 'Premium', premiumDesc: 'Eng yaxshisini istaydigan korxonalar uchun.',
    orderPremium: 'Premium Buyurtma',
    feat1Card: '1 NFC karta', feat3Fields: '3 tagacha maydon', feat7Fields: '7 tagacha maydon', feat15Fields: '15 tagacha maydon',
    featBasicColor: 'Qora yoki oq rang', featReprogrammable: 'Qayta dasturlanadi',
    featStdShipping: 'Standart yetkazish', featAllColors: 'Barcha ranglar mavjud',
    featLogoPrint: 'Logo chop etish', featPriorityShip: 'Ustuvor yetkazish',
    featCustomDesign: 'Maxsus dizayn', featExpressShip: 'Express yetkazish',
    featDedicatedSupport: 'Maxsus yordam', bestChoice: 'Eng Yaxshi Tanlov',
    foundersTitle: 'Asoschiler', foundersSub: 'NFCraft ortidagi odamlar — mutaxassislar aloqa o\'rnatish usulini qayta tasavvur qilishga bag\'ishlangan.',
    role1: 'Bosh Direktor & Front End Dasturchi', role2: 'Bosh Direktor & Backend Dasturchi',
    ourLocation: 'Bizning Manzil', locationSub: 'Studiyamizga tashrif buyuring va NFCraft kartalarini jonli ko\'ring. Ish kunlari 10:00–18:00.',
    locAddressLabel: 'Manzil', locPhoneLabel: 'Telefon', locEmailLabel: 'Email',
    modalTitle: 'Buyurtma Bering', choosePlan: 'Rejangizni Tanlang',
    planDetailStarter: 'Asosiy NFC karta, 3 ta maydon', planDetailPro: 'Barcha ranglar + logo + 7 ta maydon', planDetailPremium: 'Maxsus dizayn + express + 15 ta maydon',
    howMany: 'Nechta karta?', chooseColor: 'Rang Tanlang', addonsOpts: 'Qo\'shimchalar',
    stepPlan: 'Reja', stepQty: 'Miqdor', stepColor: 'Rang', stepOptions: 'Qo\'shimcha',
    labelPlanPrice: 'Reja narxi', labelSubtotal: 'Jami (boshlang\'ich)', labelQtyPrice: 'Soni × narx', labelTotal: 'Jami',
    colorBlack: 'Qora', colorWhite: 'Oq', colorNavy: 'Ko\'k', colorGold: 'Oltin', colorForest: 'Vino', colorNeon: 'Neon',
    addonLogoName: 'Logo Qo\'shish', addonLogoDesc: 'Kartaga logongizni chop etish',
    addonDesignName: 'Maxsus Dizayn', addonDesignDesc: 'To\'liq individual ko\'rinish',
    phoneLabel: 'Telefon raqam', phoneRequired: 'Yetkazib berish uchun majburiy', placeOrderBtn: 'Buyurtma Berish →',
    account: 'Hisob', yourProfile: 'Profilingiz', profileSub: 'Hisobingizni boshqaring va buyurtmalaringizni ko\'ring.',
    yourOrders: 'Buyurtmalarim', noOrders: 'Hali buyurtma yo\'q.', cardOrders: 'Karta Buyurtmalari', noCardOrders: 'Hali karta buyurtmasi yo\'q.',
    team: 'Jamoa', location: 'Manzil',
    authTitle: 'Buyurtma berish uchun ro\'yxatdan o\'ting',
    authSub: 'NFCraft buyurtmangizni yakunlash uchun bepul hisob yarating yoki kiring.',
    createAccount: 'Hisob Yaratish & Buyurtma Berish', signInBtn: 'Kirish & Davom Etish',
    firstName: 'Ism', lastName: 'Familiya', age: 'Yosh', address: 'Manzil',
    gender: 'Jins', select: 'Tanlang', male: 'Erkak', female: 'Ayol',
    emailLabel: 'Email', passwordLabel: 'Parol',
    enterFirstName: 'Ismingizni kiriting', enterLastName: 'Familiyangizni kiriting',
    enterAge: 'Yoshingizni kiriting', enterAddress: 'Manzilingizni kiriting',
    enterEmail: 'Emailingizni kiriting', enterPassword: 'Parolingizni kiriting',
    iltimosRejani: 'Iltimos, rejani tanlang.',
    orderPlaced: 'Buyurtma Qabul Qilindi!',
    orderSuccess: 'NFCraft kartangiz tayyorlanmoqda va tez orada yetkazib beriladi.',
    done: 'Tayyor',
  },
  ru: {
    navWhy: 'Почему NFC', navPricing: 'Цены', navTeam: 'Команда', navLocation: 'Адрес', navUsers: 'Пользователи',
    login: 'Войти', register: 'Регистрация', logout: 'Выйти', getStarted: 'Начать', signIn: 'Войти',
    heroBadge: 'NFC Технологии, Переосмысленные',
    heroTitle: 'Современные<br/><em>NFC Карты</em>',
    heroSub: 'Делитесь контактами, портфолио или ссылками одним касанием. Никаких приложений.',
    orderNow: '⚡ Заказать сейчас', exploreCards: 'Смотреть планы',
    howLabel: 'Как это работает', howTitle: 'Одно касание. Всё передано.',
    howSub: 'Приложите карту к любому смартфону — ваш профиль откроется мгновенно. Без приложений, QR-кодов и ввода данных.',
    howStep1Title: 'Закажите карту', howStep1Desc: 'Выберите тариф и цвет. Карта придёт уже запрограммированной — никакой настройки.',
    howStep2Title: 'Добавьте данные', howStep2Desc: 'Телефон, соцсети, сайт — всё, чем хотите делиться. Редактируйте в любое время с любого браузера.',
    howStep3Title: 'Прикоснитесь и свяжитесь', howStep3Desc: 'Приложите карту к любому телефону. Профиль откроется меньше чем за секунду — контакт сохранится мгновенно.',
    benefits: 'Преимущества', whyNfc: 'Почему NFC Карты?',
    whyNfcSub: 'Более умный способ делиться. Прикоснитесь картой к смартфону и мгновенно поделитесь всем.',
    instantSharing: 'Мгновенный обмен',
    instantDesc: 'Одно касание — и ваш профиль, ссылки или контакты мгновенно на их телефоне.',
    noApps: 'Без приложений',
    noAppsDesc: 'NFC встроен в каждый современный смартфон. Никаких загрузок и настроек — просто работает.',
    worksEverywhere: 'Работает везде',
    worksDesc: 'Совместим со всеми современными Android и iOS устройствами. От бюджетных до флагманов.',
    ecoFriendly: 'Экологично',
    ecoDesc: 'Многоразовая и перепрограммируемая. Обновляйте данные карты в любое время без перепечати.',
    colorsLabel: 'Цвета', colorsTitle: 'Выберите свой стиль',
    colorsSub: 'Каждая карта доставляется в выбранном вами цвете. Тот же умный NFC чип — другой характер.',
    pricing: 'Цены', simplePricing: 'Простые цены',
    pickPlan: 'Выберите подходящий план. Каждая карта доставляется готовой к использованию.',
    starter: 'Starter', starterDesc: 'Идеально для личного использования или первого знакомства с NFC.',
    orderStarter: 'Заказать Starter',
    pro: 'Pro', proDesc: 'Для профессионалов, которым нужна стильная брендированная карта.',
    orderPro: 'Заказать Pro',
    premiumTitle: 'Premium', premiumDesc: 'Для бизнеса, который хочет лучшего.',
    orderPremium: 'Заказать Premium',
    feat1Card: '1 NFC карта', feat3Fields: 'До 3 полей', feat7Fields: 'До 7 полей', feat15Fields: 'До 15 полей',
    featBasicColor: 'Чёрный или белый', featReprogrammable: 'Перепрограммируемая',
    featStdShipping: 'Стандартная доставка', featAllColors: 'Все цвета доступны',
    featLogoPrint: 'Печать логотипа', featPriorityShip: 'Приоритетная доставка',
    featCustomDesign: 'Индивидуальный дизайн', featExpressShip: 'Экспресс-доставка',
    featDedicatedSupport: 'Персональная поддержка', bestChoice: 'Лучший Выбор',
    foundersTitle: 'Основатели', foundersSub: 'Люди за NFCraft, посвятившие себя переосмыслению того, как профессионалы устанавливают связи.',
    role1: 'CEO & Front End Разработчик', role2: 'CEO & Backend Разработчик',
    ourLocation: 'Наш Адрес', locationSub: 'Посетите нашу студию и познакомьтесь с картами NFCraft лично. Открыты в будни 10:00–18:00.',
    locAddressLabel: 'Адрес', locPhoneLabel: 'Телефон', locEmailLabel: 'Email',
    modalTitle: 'Оформить заказ', choosePlan: 'Выберите план',
    planDetailStarter: 'Базовая NFC карта, 3 поля', planDetailPro: 'Все цвета + логотип + 7 полей', planDetailPremium: 'Дизайн + экспресс + 15 полей',
    howMany: 'Сколько карт?', chooseColor: 'Выберите цвет', addonsOpts: 'Дополнения',
    stepPlan: 'План', stepQty: 'Количество', stepColor: 'Цвет', stepOptions: 'Опции',
    labelPlanPrice: 'Цена плана', labelSubtotal: 'Промежуточный итог', labelQtyPrice: 'Кол-во × цена', labelTotal: 'Итого',
    colorBlack: 'Чёрный', colorWhite: 'Белый', colorNavy: 'Тёмно-синий', colorGold: 'Золотой', colorForest: 'Бордовый', colorNeon: 'Неон',
    addonLogoName: 'Добавить логотип', addonLogoDesc: 'Напечатать логотип на карте',
    addonDesignName: 'Индивидуальный дизайн', addonDesignDesc: 'Полностью уникальный дизайн',
    phoneLabel: 'Номер телефона', phoneRequired: 'Обязательно для доставки', placeOrderBtn: 'Оформить заказ →',
    account: 'Аккаунт', yourProfile: 'Мой профиль', profileSub: 'Управляйте аккаунтом и просматривайте заказы.',
    yourOrders: 'Мои заказы', noOrders: 'Заказов пока нет.', cardOrders: 'Заказы карт', noCardOrders: 'Заказов карт пока нет.',
    team: 'Команда', location: 'Адрес',
    authTitle: 'Зарегистрируйтесь для заказа',
    authSub: 'Создайте бесплатный аккаунт или войдите, чтобы завершить заказ NFCraft.',
    createAccount: 'Создать аккаунт и заказать', signInBtn: 'Войти и продолжить',
    firstName: 'Имя', lastName: 'Фамилия', age: 'Возраст', address: 'Адрес',
    gender: 'Пол', select: 'Выбрать', male: 'Мужской', female: 'Женский',
    emailLabel: 'Email', passwordLabel: 'Пароль',
    enterFirstName: 'Введите имя', enterLastName: 'Введите фамилию',
    enterAge: 'Введите возраст', enterAddress: 'Введите адрес',
    enterEmail: 'Введите email', enterPassword: 'Введите пароль',
    iltimosRejani: 'Пожалуйста, выберите план.',
    orderPlaced: 'Заказ принят!',
    orderSuccess: 'Ваша карта NFCraft изготавливается и будет доставлена в ближайшее время.',
    done: 'Готово',
  },
};

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  const meta = LANG_META[lang];
  const codeEl = document.getElementById('langCode');
  if (codeEl) codeEl.textContent = meta.code;
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-mlang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mlang === lang);
  });
  closeLangDropdown();
  applyTranslations();
}

function toggleLangDropdown(e) {
  e.stopPropagation();
  document.getElementById('langDropdown').classList.toggle('open');
}

function closeLangDropdown() {
  const dd = document.getElementById('langDropdown');
  if (dd) dd.classList.remove('open');
}

document.addEventListener('click', () => closeLangDropdown());

function toggleLanguage() { setLanguage(currentLang === 'en' ? 'uz' : 'en'); }

function toggleMobileMenu() {
  document.getElementById('mobileDropdown').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileDropdown').classList.remove('open');
}

document.addEventListener('click', e => {
  const wrap = document.querySelector('.mobile-menu-wrap');
  if (wrap && !wrap.contains(e.target)) closeMobileMenu();
});

const orderState = {
  plan: null,
  planPrice: 0,
  qty: 1,
  color: 'black',
  colorHex: '#1a1a1a',
  colorName: 'Black',
  addons: { logo: false, design: false },
  phone: '',
  currentStep: 1
};

const planPrices = { starter: 2.5, pro: 5, premium: 10 };
const addonPrices = { logo: 0.5, design: 2 };

function openOrder(plan) {
  if (!currentUser) {
    openAuth('register');
    return;
  }
  const overlay = document.getElementById('orderOverlay');
  if (overlay) {
    overlay.classList.add('active');
    goToStep(1);
    orderState.plan = null;
    document.querySelectorAll('.plan-option').forEach(el => el.classList.remove('selected'));
    if (plan) {
      selectPlan(plan);
    }
  }
}

function closeOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains('overlay')) {
    event.target.classList.remove('active');
  }
}

function selectPlan(plan) {
  document.querySelectorAll('.plan-option').forEach(el => el.classList.remove('selected'));
  const selected = document.getElementById('plan-' + plan);
  if (selected) selected.classList.add('selected');
  orderState.plan = plan;
  orderState.planPrice = planPrices[plan] || 0;
  if (orderState.currentStep === 2) updateStep2Total();
  if (orderState.currentStep === 4) updateFinalTotal();
}

function changeQty(delta) {
  orderState.qty = Math.max(1, orderState.qty + delta);
  const display = document.getElementById('qtyDisplay');
  if (display) display.textContent = orderState.qty;
  updateStep2Total();
}

function updateStep2Total() {
  const p = orderState.planPrice;
  const q = orderState.qty;
  const el = id => document.getElementById(id);
  if (el('ts2plan')) el('ts2plan').textContent = '$' + p.toFixed(2);
  if (el('ts2qty')) el('ts2qty').textContent = '× ' + q;
  if (el('ts2total')) el('ts2total').textContent = '$' + (p * q).toFixed(2);
}

function selectColor(colorId, hex, name) {
  document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
  const col = document.getElementById('col-' + colorId);
  if (col) col.classList.add('selected');
  orderState.color = colorId;
  orderState.colorHex = hex;
  orderState.colorName = name;
}

function applyShowcaseColor(card, bg, isLight) {
  card.style.background = bg;
  card.style.borderColor = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
  const logo = card.querySelector('.sc-logo');
  const label = card.querySelector('.sc-label');
  if (logo) logo.style.color = isLight ? '#111' : '#fff';
  if (label) label.style.color = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)';
  card.querySelectorAll('.sc-waves div').forEach(w => {
    w.style.borderColor = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)';
  });
}

function initShowcase() {
  const card = document.getElementById('showcaseCard');
  if (!card) return;

  const firstDot = document.querySelector('.sc-dot.selected') || document.querySelector('.sc-dot');
  if (firstDot) applyShowcaseColor(card, firstDot.dataset.bg, firstDot.dataset.light === 'true');

  document.querySelectorAll('.sc-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.sc-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
      applyShowcaseColor(card, dot.dataset.bg, dot.dataset.light === 'true');
    });
  });

  const stage = card.closest('.showcase-stage') || card.parentElement;
  let raf = null;
  let currentX = -8, currentY = 4;
  let targetX = -8, targetY = 4;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);
    card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
    raf = requestAnimationFrame(tick);
  }

  stage.addEventListener('mouseenter', () => {
    raf = requestAnimationFrame(tick);
  });

  stage.addEventListener('mousemove', e => {
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetX = dx * 18;
    targetY = -dy * 12;
  });

  stage.addEventListener('mouseleave', () => {
    targetX = -8;
    targetY = 4;
    setTimeout(() => {
      cancelAnimationFrame(raf);
      raf = null;
      card.style.transform = `rotateY(-8deg) rotateX(4deg)`;
    }, 600);
  });
}

document.addEventListener('DOMContentLoaded', initShowcase);

function toggleAddon(addonId) {
  orderState.addons[addonId] = !orderState.addons[addonId];
  const el = document.getElementById('addon-' + addonId);
  if (el) el.classList.toggle('selected', orderState.addons[addonId]);
  updateFinalTotal();
}

function updateFinalTotal() {
  const p = orderState.planPrice;
  const q = orderState.qty;
  const logoAmt = orderState.addons.logo ? addonPrices.logo * q : 0;
  const designAmt = orderState.addons.design ? addonPrices.design * q : 0;
  const total = p * q + logoAmt + designAmt;
  const el = id => document.getElementById(id);
  if (el('fin-plan')) el('fin-plan').textContent = orderState.plan ? orderState.plan.charAt(0).toUpperCase() + orderState.plan.slice(1) : '–';
  if (el('fin-qty')) el('fin-qty').textContent = q + ' × $' + p.toFixed(2);
  const logoRow = document.getElementById('fin-logo-row');
  const designRow = document.getElementById('fin-design-row');
  if (logoRow) logoRow.style.display = orderState.addons.logo ? '' : 'none';
  if (el('fin-logo')) el('fin-logo').textContent = '+$' + logoAmt.toFixed(2);
  if (designRow) designRow.style.display = orderState.addons.design ? '' : 'none';
  if (el('fin-design')) el('fin-design').textContent = '+$' + designAmt.toFixed(2);
  if (el('fin-total')) el('fin-total').textContent = '$' + total.toFixed(2);
}

function goToStep(n) {
  for (let i = 1; i <= 4; i++) {
    const step = document.getElementById('ostep' + i);
    const dot = document.getElementById('sdot' + i);
    if (step) step.classList.toggle('active', i === n);
    if (dot) {
      dot.classList.remove('active', 'done');
      if (i === n) dot.classList.add('active');
      else if (i < n) dot.classList.add('done');
    }
  }
  orderState.currentStep = n;
  if (n === 2) updateStep2Total();
  if (n === 4) updateFinalTotal();
}

function nextStep(step) {
  if (step === 1 && !orderState.plan) {
    const t = translations[currentLang];
    alert(t ? t.iltimosRejani : 'Please select a plan.');
    return;
  }
  goToStep(step + 1);
}

function prevStep(step) {
  goToStep(step - 1);
}

function placeOrder() {
  if (!currentUser) {
    alert('Please login to place an order');
    closeOverlay('orderOverlay');
    openAuth('login');
    return;
  }

  const phoneInput = document.getElementById('orderPhone');
  const phoneRaw = phoneInput ? phoneInput.value.trim() : '';
  const phoneDigits = phoneRaw.replace(/\D/g, '').replace(/^998/, '');
  if (!phoneRaw) {
    if (phoneInput) phoneInput.style.borderColor = '#ff6b6b';
    alert('Iltimos, telefon raqamingizni kiriting.');
    phoneInput && phoneInput.focus();
    return;
  }
  if (phoneDigits.length !== 9) {
    if (phoneInput) phoneInput.style.borderColor = '#ff6b6b';
    alert('O\'zbekiston telefon raqami 9 xonali bo\'lishi kerak.\nMasalan: +998 90 123 45 67');
    phoneInput && phoneInput.focus();
    return;
  }
  if (phoneInput) phoneInput.style.borderColor = '';
  const phone = '+998' + phoneDigits;
  orderState.phone = phone;

  const p = orderState.planPrice;
  const q = orderState.qty;
  const logoAmt = orderState.addons.logo ? addonPrices.logo * q : 0;
  const designAmt = orderState.addons.design ? addonPrices.design * q : 0;
  const total = p * q + logoAmt + designAmt;

  const orderData = {
    userId: currentUser.id,
    plan: orderState.plan,
    quantity: q,
    color: orderState.color,
    addons: orderState.addons,
    total: total,
    status: 'pending',
    phoneNumber: phone
  };

  fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token}`
    },
    body: JSON.stringify(orderData)
  })
  .then(async res => {
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      // Token eskirgan yoki notog'ri — qayta login
      if (res.status === 401 || res.status === 403) {
        currentUser = null; isAdmin = false; isSuperAdmin = false;
        localStorage.removeItem('currentUser');
        closeOverlay('orderOverlay');
        alert('Sessiya tugagan. Iltimos qayta login qiling.');
        updateAuthUI();
        openAuth('login');
        return;
      }
      throw new Error(errData.message || 'Buyurtma yuborib bo\'lmadi');
    }
    return res.json();
  })
  .then(data => {
    if (!data) return;
    _lastOrderId = data.orderId || null;
    _lastOrderPlan = orderState.plan || 'starter';

    closeOverlay('orderOverlay');
    openCardInfoForm();

    orderState.plan = null;
    orderState.qty = 1;
    orderState.color = 'black';
    orderState.addons = { logo: false, design: false };
    orderState.phone = '';
    if (phoneInput) phoneInput.value = '';
  })
  .catch(err => {
    alert('Xato: ' + err.message);
  });
}

function openAuth(mode) {
  const overlay = document.getElementById('authOverlay');
  if (overlay) {
    overlay.classList.add('active');
    if (mode) switchAuthTab(mode);
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(el => el.classList.add('hidden'));
  const tabBtn = document.querySelector(`.auth-tab[onclick="switchAuthTab('${tab}')"]`);
  const form = document.getElementById('form-' + tab);
  if (tabBtn) tabBtn.classList.add('active');
  if (form) form.classList.remove('hidden');
}

// Pending registration data (OTP dan oldin saqlanadi)
let _pendingRegData = null;

async function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName  = document.getElementById('regLastName').value.trim();
  const email     = document.getElementById('regEmail').value.trim();
  const password  = document.getElementById('regPassword').value;
  const age       = parseInt(document.getElementById('regAge').value);
  const address   = document.getElementById('regAddress').value;
  const gender    = document.getElementById('regGender').value;

  if (!firstName || !lastName || !email || !password || !age || !address || !gender) {
    alert('Barcha maydonlarni to\'ldiring.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, age, address, gender })
    });

    if (res.status === 409) {
      const go = confirm('Bu email allaqachon ro\'yxatdan o\'tgan.\n\nKirish sahifasiga o\'tishni xohlaysizmi?');
      if (go) switchAuthTab('login');
      return;
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Ro\'yxatdan o\'tib bo\'lmadi');
    }

    // Faqat OTP yuborildi — user hali DB da yo'q
    // Pending ma'lumotni saqlaymiz
    _pendingRegData = { email, firstName, lastName, age, address, gender };
    closeOverlay('authOverlay');
    openOtpVerify(email);
  } catch (err) {
    alert('Ro\'yxatdan o\'tish xatosi: ' + err.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Iltimos, email va parolni kiriting.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.status === 401) {
      alert('Email yoki parol noto\'g\'ri');
      return;
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Kirib bo\'lmadi');
    }

    const data = await res.json();

    if (!data.token) {
      throw new Error('Token qaytmadi. Backend bilan bog\'liq muammo.');
    }

    const _isSuperAdmin = email.toLowerCase() === 'whatififlydidy@gmail.com'
      || data.isSuperAdmin === true || data.isSuperAdmin === 1 || data.isSuperAdmin === 'true';
    const _isAdmin = _isSuperAdmin
      || data.isAdmin === true || data.isAdmin === 1 || data.isAdmin === 'true' || data.is_admin === true;

    currentUser = {
      id: data.userId,
      email: email,
      firstName: data.firstName || 'Foydalanuvchi',
      lastName: data.lastName || '',
      isAdmin: _isAdmin,
      isSuperAdmin: _isSuperAdmin,
      token: data.token
    };
    isAdmin = currentUser.isAdmin;
    isSuperAdmin = currentUser.isSuperAdmin;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeOverlay('authOverlay');
    alert('Kirish muvaffaqiyatli!');
  } catch (err) {
    alert('Kirish xatosi: ' + err.message);
  }
}

function openProfile() {
  if (!currentUser) {
    openAuth('login');
    return;
  }
  if (!isAdmin) {
    openUserPanel();
  }
}

function logout() {
  currentUser = null;
  isAdmin = false;
  localStorage.removeItem('currentUser');
  location.reload();
}

function filterCards(category, btn) {
  document.querySelectorAll('.filter-pill').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}

function applyTranslations() {
  const t = translations[currentLang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) heroBadge.innerHTML = `<span class="dot"></span> ${t.heroBadge}`;
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) heroTitle.innerHTML = t.heroTitle;
}

const API_BASE    = 'https://nfcraftbackend1-production.up.railway.app/api';
const API_BASE_V1 = 'https://nfcraftbackend1-production.up.railway.app/api/v1';

let _otpEmail = '';

function openOtpVerify(prefillEmail = '') {
  const overlay = document.getElementById('otpOverlay');
  if (!overlay) return;

  const filled = prefillEmail || (currentUser?.email || '');
  const emailInput = document.getElementById('otpEmail');
  if (emailInput) {
    emailInput.value = filled;
  }

  // Registration flow: code already sent by /register, skip straight to digit entry
  if (_pendingRegData && filled) {
    _otpEmail = filled;
    const displayEl = document.getElementById('otpEmailDisplay');
    if (displayEl) displayEl.textContent = filled;
    _otpStep(2);
  } else {
    _otpStep(1);
    if (filled) {
      _otpLockEmail();
    } else {
      _otpUnlockEmail();
    }
  }

  overlay.classList.add('active');
}

function _otpLockEmail() {
  const emailInput = document.getElementById('otpEmail');
  const editBtn    = document.getElementById('otpEditEmailBtn');
  if (emailInput) {
    emailInput.setAttribute('readonly', true);
    emailInput.style.opacity = '0.65';
    emailInput.style.cursor  = 'not-allowed';
  }
  if (editBtn) editBtn.style.display = 'flex';
}

function _otpUnlockEmail() {
  const emailInput = document.getElementById('otpEmail');
  const editBtn    = document.getElementById('otpEditEmailBtn');
  if (emailInput) {
    emailInput.removeAttribute('readonly');
    emailInput.style.opacity = '';
    emailInput.style.cursor  = '';
    emailInput.focus();
    const val = emailInput.value;
    emailInput.value = '';
    emailInput.value = val;
  }
  if (editBtn) editBtn.style.display = 'none';
}

function otpEnableEmailEdit() {
  // Agar account allaqachon yaratilgan bo'lsa (register orqali kelgan)
  // email o'zgartirilsa — eski email bilan account qoladi
  // Shuning uchun qaytadan ro'yxatdan o'tishni taklif qilamiz
  if (currentUser && currentUser.token) {
    const confirmed = confirm(
      'Emailni o\'zgartirish uchun qaytadan ro\'yxatdan o\'tishingiz kerak.\n\n' +
      'Hozirgi ma\'lumotlar o\'chib ketadi. Davom etasizmi?'
    );
    if (!confirmed) return;
    // Avval yaratilgan accountni tozalaymiz
    currentUser = null;
    isAdmin = false;
    isSuperAdmin = false;
    localStorage.removeItem('currentUser');
    // OTP ni yopamiz, register formani ochamiz
    closeOverlay('otpOverlay');
    setTimeout(() => openAuth('register'), 200);
    return;
  }
  _otpUnlockEmail();
  _otpHideMsg(1);
}

function _otpStep(n) {
  document.getElementById('otpStep1').style.display = n === 1 ? '' : 'none';
  document.getElementById('otpStep2').style.display = n === 2 ? '' : 'none';
  _otpHideMsg(1);
  _otpHideMsg(2);
  if (n === 1) _otpClearBoxes();
  if (n === 2) {
    setTimeout(() => {
      const first = document.querySelector('.otp-box');
      if (first) first.focus();
    }, 80);
  }
}

function _otpShowMsg(step, text, isError) {
  const el = document.getElementById('otpMsg' + step);
  if (!el) return;
  el.textContent = text;
  el.className = 'otp-msg ' + (isError ? 'otp-msg-error' : 'otp-msg-success');
  el.style.display = '';
}

function _otpHideMsg(step) {
  const el = document.getElementById('otpMsg' + step);
  if (el) { el.style.display = 'none'; el.textContent = ''; }
}

function _otpClearBoxes() {
  document.querySelectorAll('.otp-box').forEach(b => { b.value = ''; b.classList.remove('filled'); });
}

function otpBackToEmail() {
  _otpStep(1);
  _otpLockEmail();
}

async function handleSendCode() {
  const email = document.getElementById('otpEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    _otpShowMsg(1, 'Iltimos, to\'g\'ri email manzil kiriting.', true);
    return;
  }

  const btn = document.getElementById('sendCodeBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  _otpHideMsg(1);

  try {
    const res = await fetch(`${API_BASE_V1}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (data.status === true || data.success === true || res.ok) {
      _otpEmail = email;
      document.getElementById('otpEmailDisplay').textContent = email;
      _otpLockEmail();
      _otpStep(2);
    } else {
      _otpShowMsg(1, data.message || 'Failed to send code. Please try again.', true);
    }
  } catch (_) {
    _otpShowMsg(1, 'Network error. Check your connection and try again.', true);
  } finally {
    btn.textContent = 'Send Verification Code';
    btn.disabled = false;
  }
}

async function handleVerifyCode() {
  const boxes = document.querySelectorAll('.otp-box');
  const code = Array.from(boxes).map(b => b.value).join('');

  if (code.length < 6 || !/^\d{6}$/.test(code)) {
    _otpShowMsg(2, 'Please enter all 6 digits.', true);
    return;
  }

  const btn = document.getElementById('verifyCodeBtn');
  btn.textContent = 'Verifying…';
  btn.disabled = true;
  _otpHideMsg(2);

  // Registration flow: complete-register (creates user in DB)
  if (_pendingRegData) {
    try {
      const res = await fetch(`${API_BASE}/auth/complete-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: _pendingRegData.email, code })
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (data.success === true) {
        // Save user session
        const _isSuperAdmin = data.isSuperAdmin === true
          || (data.email && data.email.toLowerCase() === 'whatififlydidy@gmail.com');
        const _isAdmin = _isSuperAdmin || data.isAdmin === true;

        currentUser = {
          id: data.userId,
          token: data.token,
          firstName: data.firstName,
          lastName: data.lastName,
          email: _pendingRegData.email,
          isAdmin: _isAdmin,
          isSuperAdmin: _isSuperAdmin
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        isSuperAdmin = _isSuperAdmin;
        _pendingRegData = null;

        _otpShowMsg(2, '✓ Ro\'yxatdan muvaffaqiyatli o\'tdingiz!', false);
        btn.style.display = 'none';
        setTimeout(() => {
          closeOverlay('otpOverlay');
          btn.style.display = '';
          btn.textContent = 'Verify Code';
          btn.disabled = false;
          updateAuthUI();
        }, 1800);
      } else {
        _otpShowMsg(2, data.message || 'Kod xato yoki muddati o\'tgan. Qayta urinib ko\'ring.', true);
        _otpClearBoxes();
        btn.textContent = 'Verify Code';
        btn.disabled = false;
        setTimeout(() => {
          const first = document.querySelector('.otp-box');
          if (first) first.focus();
        }, 80);
      }
    } catch (_) {
      _otpShowMsg(2, 'Network error. Check your connection and try again.', true);
      btn.textContent = 'Verify Code';
      btn.disabled = false;
    }
    return;
  }

  // Email-verify-only flow (e.g. email change confirmation)
  try {
    const res = await fetch(`${API_BASE_V1}/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: _otpEmail, code })
    });

    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (data.status === true || data.success === true || res.ok) {
      _otpShowMsg(2, data.message || '✓ Email verified successfully!', false);
      btn.style.display = 'none';
      setTimeout(() => {
        closeOverlay('otpOverlay');
        btn.style.display = '';
      }, 1800);
    } else {
      _otpShowMsg(2, data.message || 'Invalid code. Please try again.', true);
      _otpClearBoxes();
      setTimeout(() => {
        const first = document.querySelector('.otp-box');
        if (first) first.focus();
      }, 80);
    }
  } catch (_) {
    _otpShowMsg(2, 'Network error. Check your connection and try again.', true);
  } finally {
    btn.textContent = 'Verify Code';
    btn.disabled = false;
  }
}

function _initOtpBoxes() {
  const boxes = document.querySelectorAll('.otp-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '').slice(-1);
      box.classList.toggle('filled', !!box.value);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].value = '';
        boxes[i - 1].classList.remove('filled');
        boxes[i - 1].focus();
      }
      if (e.key === 'Enter') handleVerifyCode();
    });
    box.addEventListener('paste', e => {
      e.preventDefault();
      const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      boxes.forEach((b, j) => {
        b.value = digits[j] || '';
        b.classList.toggle('filled', !!b.value);
      });
      const focusIdx = Math.min(digits.length, boxes.length - 1);
      boxes[focusIdx].focus();
    });
  });
}

async function loadUsers() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" style="padding:1.5rem;text-align:center;color:var(--muted2)">Yuklanmoqda...</td></tr>';
  try {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { 'Authorization': `Bearer ${currentUser?.token}` }
    });
    if (!res.ok) throw new Error('Server xatosi: ' + res.status);
    const data = await res.json();
    const users = Array.isArray(data) ? data : (data.users || data.data || []);
    renderUsersTable(users);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding:1.5rem;text-align:center;color:#ff6b6b">
      Foydalanuvchilarni yuklab bo'lmadi: ${err.message}</td></tr>`;
  }
}

function renderUsersTable(users) {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;
  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="padding:1.5rem;text-align:center;color:var(--muted2)">Foydalanuvchilar topilmadi</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(u => {
    const firstName = u.firstname || u.firstName || '';
    const lastName  = u.lastname  || u.lastName  || '';
    const email     = u.email     || '–';
    const phone     = u.phonenumber || u.phoneNumber || '–';
    const age       = u.age != null ? u.age : '–';
    const gender    = u.gender === 'male' ? 'Erkak' : u.gender === 'female' ? 'Ayol' : (u.gender || '–');
    return `
      <tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.75rem 1rem;font-size:0.82rem;color:var(--muted2)">${u.id}</td>
        <td style="padding:0.75rem 1rem;font-size:0.88rem">${firstName} ${lastName}</td>
        <td style="padding:0.75rem 1rem;font-size:0.82rem;color:var(--muted2)">${email}</td>
        <td style="padding:0.75rem 1rem;font-size:0.82rem;color:var(--muted2)">${phone}</td>
        <td style="padding:0.75rem 1rem;font-size:0.82rem;color:var(--muted2)">${age}</td>
        <td style="padding:0.75rem 1rem;font-size:0.82rem;color:var(--muted2)">${gender}</td>
        <td style="padding:0.75rem 1rem">
          <button onclick="editUser(${u.id})" style="padding:0.35rem 0.8rem;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:6px;font-size:0.78rem;cursor:pointer;margin-right:0.4rem">Tahrirlash</button>
          <button onclick="deleteUser(${u.id})" style="padding:0.35rem 0.8rem;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);color:#ff6b6b;border-radius:6px;font-size:0.78rem;cursor:pointer">O'chirish</button>
        </td>
      </tr>`;
  }).join('');
}

async function submitUserForm(event) {
  event.preventDefault();
  const id        = document.getElementById('editUserId').value;
  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('userEmail').value.trim();
  const password  = document.getElementById('userPassword').value;
  const age       = parseInt(document.getElementById('age').value);
  const phone     = document.getElementById('phoneNumber').value.trim();
  const gender    = document.getElementById('gender').value;

  if (!firstName || !lastName || !email || !age || !gender) {
    alert('Barcha majburiy maydonlarni to\'ldiring.');
    return;
  }

  const body = { firstName, lastName, email, age, gender };
  if (phone)    body.phonenumber = phone;
  if (!id && password) body.password = password;
  if (id && password)  body.password = password;

  const submitBtn = document.getElementById('userFormSubmitBtn');
  submitBtn.textContent = 'Saqlanmoqda...';
  submitBtn.disabled = true;

  try {
    const url    = id ? `${API_BASE}/users/${id}` : `${API_BASE}/users`;
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Server xatosi: ' + res.status);
    }
    alert(id ? 'Foydalanuvchi muvaffaqiyatli yangilandi' : 'Foydalanuvchi muvaffaqiyatli qo\'shildi');
    cancelEditUser();
    loadUsers();
  } catch (err) {
    alert('Xato: ' + err.message);
  } finally {
    submitBtn.textContent = id ? 'Yangilash' : 'Qo\'shish';
    submitBtn.disabled = false;
  }
}

let _usersCache = [];

async function editUser(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      headers: { 'Authorization': `Bearer ${currentUser?.token}` }
    });
    if (!res.ok) throw new Error('Server xatosi: ' + res.status);
    const u = await res.json();
    const user = u.user || u.data || u;

    document.getElementById('editUserId').value    = user.id;
    document.getElementById('firstName').value     = user.firstname  || user.firstName  || '';
    document.getElementById('lastName').value      = user.lastname   || user.lastName   || '';
    document.getElementById('userEmail').value     = user.email      || '';
    document.getElementById('userPassword').value  = '';
    document.getElementById('age').value           = user.age        || '';
    document.getElementById('phoneNumber').value   = user.phonenumber || user.phoneNumber || '';
    document.getElementById('gender').value        = user.gender     || '';

    document.getElementById('userFormTitle').textContent    = 'Foydalanuvchini Tahrirlash';
    document.getElementById('userFormSubmitBtn').textContent = 'Yangilash';
    document.getElementById('userFormCancelBtn').style.display = 'block';
    document.getElementById('userManagement').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    alert('Ma\'lumotlarni yuklab bo\'lmadi: ' + err.message);
  }
}

async function deleteUser(id) {
  if (!confirm('Bu foydalanuvchini o\'chirishni tasdiqlaysizmi?')) return;
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser?.token}` }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Server xatosi: ' + res.status);
    }
    alert('Foydalanuvchi muvaffaqiyatli o\'chirildi');
    loadUsers();
  } catch (err) {
    alert('Xato: ' + err.message);
  }
}

function cancelEditUser() {
  document.getElementById('userForm').reset();
  document.getElementById('editUserId').value = '';
  document.getElementById('userFormTitle').textContent     = 'Foydalanuvchi Qo\'shish / Tahrirlash';
  document.getElementById('userFormSubmitBtn').textContent = 'Qo\'shish';
  document.getElementById('userFormCancelBtn').style.display = 'none';
}

async function loadAdminDashboard() {
  const superAdminSection = document.getElementById('adminManagementSection');
  if (superAdminSection) superAdminSection.style.display = isSuperAdmin ? 'block' : 'none';
  const roleLabel = document.getElementById('adminRoleLabel');
  if (roleLabel) roleLabel.textContent = isSuperAdmin ? 'Super Admin' : 'Admin';
  await Promise.all([loadAdminStats(), loadAllOrders(), loadAdminUsers()]);
  if (isSuperAdmin) loadAdminManagement();
}

async function loadAdminStats() {
  try {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const users = Array.isArray(data) ? data : (data.users || []);
    document.getElementById('statUsers').textContent = users.length;
  } catch {
    document.getElementById('statUsers').textContent = '—';
  }
}

async function loadAdminUsers() {
  const tbody = document.getElementById('adminUsersBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const users = Array.isArray(data) ? data : (data.users || []);
    if (!users.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding:1rem;text-align:center;color:var(--muted2)">Foydalanuvchi yo\'q</td></tr>';
      return;
    }
    tbody.innerHTML = users.map(u => {
      const isUserAdmin = u.isAdmin === true || u.isAdmin === 1;
      const isSuperAdminUser = currentUser && u.email === (currentUser.email === currentUser.email ? 'whatififlydidy@gmail.com' : '');
      const adminBadge = isUserAdmin
        ? `<span style="padding:0.15rem 0.5rem;border-radius:20px;font-size:0.65rem;background:rgba(232,255,71,0.12);color:var(--accent);margin-left:0.4rem;">Admin</span>` : '';
      const toggleBtn = isSuperAdmin && u.email !== 'whatififlydidy@gmail.com'
        ? `<button onclick="toggleUserAdmin(${u.id},${isUserAdmin},'${(u.firstName||'')+ ' '+(u.lastName||'')}')"
            style="padding:0.25rem 0.7rem;background:${isUserAdmin?'rgba(255,80,80,0.1)':'rgba(232,255,71,0.1)'};border:1px solid ${isUserAdmin?'rgba(255,80,80,0.3)':'rgba(232,255,71,0.3)'};color:${isUserAdmin?'#ff6b6b':'var(--accent)'};border-radius:6px;font-size:0.75rem;cursor:pointer">${isUserAdmin?'Admin olish':'Admin qilish'}</button>` : '';
      return `
      <tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.6rem 0.8rem;font-weight:700;color:var(--accent);font-size:0.85rem">#${u.id}</td>
        <td style="padding:0.6rem 0.8rem">${u.firstName || u.firstname || ''} ${u.lastName || u.lastname || ''}${adminBadge}</td>
        <td style="padding:0.6rem 0.8rem;color:var(--muted2)">${u.email}</td>
        <td style="padding:0.6rem 0.8rem;color:var(--muted2)">${u.age || '—'}</td>
        <td style="padding:0.6rem 0.8rem;color:var(--muted2)">${u.gender === 'male' ? 'Erkak' : u.gender === 'female' ? 'Ayol' : '—'}</td>
        <td style="padding:0.6rem 0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button onclick="openUserEdit(${u.id},'${u.firstName || u.firstname || ''}','${u.lastName || u.lastname || ''}','${u.email}',${u.age || 0},'${u.gender || ''}')"
            style="padding:0.25rem 0.7rem;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:6px;font-size:0.75rem;cursor:pointer">Tahrirlash</button>
          <button onclick="adminDeleteUser(${u.id})"
            style="padding:0.25rem 0.7rem;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);color:#ff6b6b;border-radius:6px;font-size:0.75rem;cursor:pointer">O'chirish</button>
          ${toggleBtn}
        </td>
      </tr>`;
    }).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" style="padding:1rem;text-align:center;color:#ff6b6b">Xato yuz berdi</td></tr>';
  }
}

function openUserEdit(id, firstName, lastName, email, age, gender) {
  document.getElementById('editId').value        = id;
  document.getElementById('editFirstName').value = firstName;
  document.getElementById('editLastName').value  = lastName;
  document.getElementById('editEmail').value     = email;
  document.getElementById('editAge').value       = age;
  document.getElementById('editGender').value    = gender;
  document.getElementById('userEditOverlay').classList.add('active');
}

async function saveUserEdit() {
  const id        = document.getElementById('editId').value;
  const firstName = document.getElementById('editFirstName').value.trim();
  const lastName  = document.getElementById('editLastName').value.trim();
  const email     = document.getElementById('editEmail').value.trim();
  const age       = parseInt(document.getElementById('editAge').value);
  const gender    = document.getElementById('editGender').value;

  if (!firstName || !lastName || !email || !age) {
    alert('Barcha maydonlarni to\'ldiring');
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({ firstName, lastName, email, age, gender })
    });
    if (!res.ok) throw new Error();
    closeOverlay('userEditOverlay');
    loadAdminUsers();
    loadAdminStats();
  } catch {
    alert('Xato yuz berdi');
  }
}

async function adminDeleteUser(id) {
  if (!confirm('Bu foydalanuvchini o\'chirishni tasdiqlaysizmi?')) return;
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (!res.ok) throw new Error();
    loadAdminUsers();
    loadAdminStats();
  } catch {
    alert('Xato yuz berdi');
  }
}

async function loadAdminManagement() {
  const adminsBody = document.getElementById('adminAdminsBody');
  if (!adminsBody) return;
  try {
    const res = await fetch(`${API_BASE}/users/admins`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (!res.ok) throw new Error();
    const admins = await res.json();
    if (!Array.isArray(admins) || admins.length === 0) {
      adminsBody.innerHTML = '<tr><td colspan="3" style="padding:1rem;text-align:center;color:var(--muted2)">Admin yo\'q</td></tr>';
      return;
    }
    adminsBody.innerHTML = admins.map(u => {
      const isSelf = u.email === 'whatififlydidy@gmail.com';
      return `<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.6rem 0.8rem">
          ${u.firstName || ''} ${u.lastName || ''}
          ${isSelf ? '<span style="padding:0.15rem 0.5rem;border-radius:20px;font-size:0.62rem;background:rgba(232,255,71,0.15);color:var(--accent);margin-left:0.4rem;">Super Admin</span>' : ''}
        </td>
        <td style="padding:0.6rem 0.8rem;color:var(--muted2);font-size:0.83rem">${u.email}</td>
        <td style="padding:0.6rem 0.8rem">
          ${!isSelf ? `<button onclick="toggleUserAdmin(${u.id},true,'${(u.firstName||'')+' '+(u.lastName||'')}')"
            style="padding:0.25rem 0.7rem;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);color:#ff6b6b;border-radius:6px;font-size:0.75rem;cursor:pointer">Admin olish</button>` : '<span style="color:var(--muted);font-size:0.75rem">—</span>'}
        </td>
      </tr>`;
    }).join('');
  } catch {
    adminsBody.innerHTML = '<tr><td colspan="3" style="padding:1rem;text-align:center;color:#ff6b6b">Xato yuz berdi</td></tr>';
  }
}

async function toggleUserAdmin(userId, currentAdminStatus, name) {
  const action = currentAdminStatus ? 'admin huquqini olib tashlash' : 'admin qilish';
  if (!confirm(`"${name.trim()}" foydalanuvchisini ${action}ni tasdiqlaysizmi?`)) return;
  try {
    const res = await fetch(`${API_BASE}/users/${userId}/toggle-admin`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Xato');
    await Promise.all([loadAdminUsers(), loadAdminManagement()]);
  } catch (e) {
    alert('Xato: ' + (e.message || 'Noma\'lum xato'));
  }
}

async function loadAllOrders() {
  const tbody = document.getElementById('adminOrdersBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const orders = Array.isArray(data) ? data : (data.orders || []);

    document.getElementById('statOrders').textContent = orders.length;
    const revenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    document.getElementById('statRevenue').textContent = '$' + revenue.toFixed(2);

    document.getElementById('planStarter').textContent = orders.filter(o => o.plan === 'starter').length;
    document.getElementById('planPro').textContent     = orders.filter(o => o.plan === 'pro').length;
    document.getElementById('planPremium').textContent = orders.filter(o => o.plan === 'premium').length;

    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding:1rem;text-align:center;color:var(--muted2)">Buyurtma yo\'q</td></tr>';
      return;
    }
    tbody.innerHTML = orders.map(o => {
      const sc = o.status === 'completed' ? '#4ade80' : o.status === 'cancelled' ? '#ff6b6b' : '#facc15';
      const oid = o.orderId || o.id || '—';
      return `<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.5rem 0.7rem;font-weight:700;color:var(--accent);font-size:0.85rem">#${oid}</td>
        <td style="padding:0.5rem 0.7rem;color:var(--muted2);font-size:0.82rem">User #${o.userId}</td>
        <td style="padding:0.5rem 0.7rem;text-transform:capitalize">${o.plan}</td>
        <td style="padding:0.5rem 0.7rem">${o.quantity || 1}</td>
        <td style="padding:0.5rem 0.7rem">$${parseFloat(o.total || 0).toFixed(2)}</td>
        <td style="padding:0.5rem 0.7rem">
          <span style="padding:0.2rem 0.6rem;border-radius:20px;font-size:0.72rem;background:${sc}22;color:${sc}">${o.status || 'pending'}</span>
        </td>
      </tr>`;
    }).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" style="padding:1rem;text-align:center;color:#ff6b6b">Xato yuz berdi</td></tr>';
  }
}

function openUserPanel() {
  const overlay = document.getElementById('userPanelOverlay');
  if (overlay) {
    overlay.classList.add('active');
    loadUserDashboard();
  }
}

function closeUserPanel() {
  const overlay = document.getElementById('userPanelOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function loadUserDashboard() {
  loadUserOrders();
  loadUserProfile();
}

async function loadUserProfile() {
  const profileName = document.getElementById('userPanelName');
  const profileEmail = document.getElementById('userPanelEmail');

  if (profileName) profileName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  if (profileEmail) profileEmail.textContent = currentUser.email;
}

async function loadUserOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders/user/${currentUser.id}`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });

    if (!res.ok) throw new Error('Failed to load orders');

    const data = await res.json();
    const orders = Array.isArray(data) ? data : (data.orders || []);

    const tbody = document.getElementById('userOrdersBody');
    if (!tbody) return;

    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="4" style="padding:1.5rem;text-align:center;color:var(--muted2)">No orders yet</td></tr>';
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const statusColor = o.status === 'completed' ? '#4ade80' : o.status === 'cancelled' ? '#ff6b6b' : '#facc15';
      const planLabel = o.plan ? o.plan.charAt(0).toUpperCase() + o.plan.slice(1) : '—';
      return `
        <tr style="border-bottom:1px solid var(--border)">
          <td style="padding:0.75rem 1rem;font-size:0.88rem;font-weight:500">${planLabel}</td>
          <td style="padding:0.75rem 1rem;font-size:0.85rem;color:var(--muted2)">${o.quantity || 1}</td>
          <td style="padding:0.75rem 1rem;font-size:0.88rem;font-weight:500">$${parseFloat(o.total || 0).toFixed(2)}</td>
          <td style="padding:0.75rem 1rem">
            <span style="padding:0.2rem 0.7rem;border-radius:20px;font-size:0.75rem;background:${statusColor}22;color:${statusColor}">${o.status || 'pending'}</span>
          </td>
        </tr>`;
    }).join('');
  } catch (err) {
    console.error('Error loading user orders:', err);
  }
}

const PLAN_LIMITS = { starter: 3, pro: 7, premium: 15 };

const FIELD_TYPES = [
  { type: 'Telegram',   placeholder: '@username',            example: '@yourname',            icon: '✈️' },
  { type: 'Instagram',  placeholder: '@username',            example: '@yourname',            icon: '📸' },
  { type: 'WhatsApp',   placeholder: '+998901234567',        example: '+998 90 123 45 67',    icon: '💬' },
  { type: 'Telefon',    placeholder: '+998901234567',        example: '+998 90 123 45 67',    icon: '📱' },
  { type: 'Email',      placeholder: 'email@example.com',   example: 'you@gmail.com',        icon: '📧' },
  { type: 'Website',    placeholder: 'https://yoursite.com',example: 'https://example.com',  icon: '🌐' },
  { type: 'LinkedIn',   placeholder: 'linkedin.com/in/you', example: 'linkedin.com/in/name', icon: '💼' },
  { type: 'TikTok',     placeholder: '@username',            example: '@yourname',            icon: '🎵' },
  { type: 'YouTube',    placeholder: '@channel',             example: '@yourchannel',         icon: '▶️' },
  { type: 'Facebook',   placeholder: 'facebook.com/you',    example: 'facebook.com/name',    icon: '👥' },
  { type: 'Twitter/X',  placeholder: '@username',            example: '@yourname',            icon: '𝕏'  },
  { type: 'Manzil',     placeholder: 'Shahar, Ko\'cha',      example: 'Toshkent, Chilonzor',  icon: '📍' },
  { type: 'Boshqa',     placeholder: 'Ma\'lumot',            example: 'Istalgan ma\'lumot',   icon: '📋' },
];

let _lastOrderId = null;
let _lastOrderPlan = 'starter';
let _ciUidCounter = 0;
let _generatedCardLink = '';
let _ciPhotoBase64 = null;

function previewCiPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height, 400);
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
      _ciPhotoBase64 = canvas.toDataURL('image/jpeg', 0.82);
      const imgEl = document.getElementById('ciPhotoImg');
      const plus = document.getElementById('ciPhotoPlus');
      const label = document.getElementById('ciPhotoLabel');
      if (imgEl) { imgEl.src = _ciPhotoBase64; imgEl.style.display = 'block'; }
      if (plus) plus.style.display = 'none';
      if (label) label.style.borderStyle = 'solid';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function openCardInfoForm() {
  _ciUidCounter = 0;
  _ciPhotoBase64 = null;
  const list = document.getElementById('ciFieldsList');
  if (list) list.innerHTML = '';
  const imgEl = document.getElementById('ciPhotoImg');
  const plus = document.getElementById('ciPhotoPlus');
  const label = document.getElementById('ciPhotoLabel');
  const photoInput = document.getElementById('ciPhotoInput');
  if (imgEl) { imgEl.src = ''; imgEl.style.display = 'none'; }
  if (plus) plus.style.display = '';
  if (label) label.style.borderStyle = 'dashed';
  if (photoInput) photoInput.value = '';

  const plan = _lastOrderPlan || 'starter';
  const limit = PLAN_LIMITS[plan] || 3;
  const note = document.getElementById('ciPlanNote');
  if (note) note.textContent = `${plan.charAt(0).toUpperCase()+plan.slice(1)} rejasi: maksimal ${limit} ta ma'lumot kiriting.`;

  updateCiCount();
  addCardField();
  document.getElementById('cardInfoOverlay').classList.add('active');
}

function addCardField() {
  const plan = _lastOrderPlan || 'starter';
  const limit = PLAN_LIMITS[plan] || 3;
  const currentCount = document.getElementById('ciFieldsList')?.children.length || 0;
  if (currentCount >= limit) {
    alert(`${plan.charAt(0).toUpperCase()+plan.slice(1)} rejasida maksimal ${limit} ta ma'lumot kiritish mumkin.`);
    return;
  }

  const idx = _ciUidCounter++;
  const defaultType = FIELD_TYPES[0];
  const optionsHtml = FIELD_TYPES.map(f =>
    `<option value="${f.type}">${f.icon} ${f.type}</option>`
  ).join('');

  const div = document.createElement('div');
  div.id = `ci-field-${idx}`;
  div.style.cssText = 'background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:0.9rem 1rem;margin-bottom:0.7rem;';
  div.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.6rem;">
      <select id="ci-select-${idx}" onchange="onCiTypeChange(${idx})"
        style="flex:1;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:0.4rem 0.6rem;font-family:'DM Sans',sans-serif;font-size:0.82rem;cursor:pointer;">
        ${optionsHtml}
      </select>
      <button onclick="removeCiField(${idx})" style="background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);color:#ff6b6b;border-radius:8px;padding:0.3rem 0.6rem;cursor:pointer;font-size:0.8rem;">✕</button>
    </div>
    <input id="ci-input-${idx}" type="text"
      placeholder="${defaultType.placeholder}"
      style="width:100%;box-sizing:border-box;padding:0.55rem 0.7rem;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:10px;outline:none;" />
    <div id="ci-label-${idx}" style="font-size:15px;font-weight:600;margin-top:0.45rem;color:var(--text);">${defaultType.icon} ${defaultType.type}</div>
    <div id="ci-example-${idx}" style="font-size:10px;color:var(--muted2);margin-top:0.15rem;">Misol: ${defaultType.example}</div>
  `;
  document.getElementById('ciFieldsList').appendChild(div);
  updateCiCount();
}

function onCiTypeChange(idx) {
  const sel = document.getElementById(`ci-select-${idx}`);
  const ft = FIELD_TYPES.find(f => f.type === sel.value) || FIELD_TYPES[0];
  const input = document.getElementById(`ci-input-${idx}`);
  const label = document.getElementById(`ci-label-${idx}`);
  const example = document.getElementById(`ci-example-${idx}`);
  if (input) input.placeholder = ft.placeholder;
  if (label) label.textContent = `${ft.icon} ${ft.type}`;
  if (example) example.textContent = `Misol: ${ft.example}`;
}

function removeCiField(idx) {
  const el = document.getElementById(`ci-field-${idx}`);
  if (el) { el.remove(); updateCiCount(); }
}

function updateCiCount() {
  const plan = _lastOrderPlan || 'starter';
  const limit = PLAN_LIMITS[plan] || 3;
  const count = document.getElementById('ciFieldsList')?.children.length || 0;
  const countEl = document.getElementById('ciCount');
  if (countEl) countEl.textContent = `${count} / ${limit}`;
  const addBtn = document.getElementById('ciAddBtn');
  if (addBtn) addBtn.style.opacity = count >= limit ? '0.4' : '1';
}

async function submitCardInfo() {
  const fields = [];
  const fieldEls = document.getElementById('ciFieldsList')?.children || [];
  for (const el of fieldEls) {
    const id = el.id.replace('ci-field-', '');
    const sel = document.getElementById(`ci-select-${id}`);
    const inp = document.getElementById(`ci-input-${id}`);
    if (sel && inp && inp.value.trim()) {
      fields.push({ type: sel.value, value: inp.value.trim() });
    }
  }

  if (!fields.length) {
    alert('Kamida 1 ta ma\'lumot kiriting.');
    return;
  }

  const body = {
    orderId: _lastOrderId,
    userId: currentUser?.id,
    plan: _lastOrderPlan || 'starter',
    ownerName: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim(),
    fields,
    photo: _ciPhotoBase64 || null
  };

  try {
    const res = await fetch(`${API_BASE}/card-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser?.token}`
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Xato yuz berdi');

    _generatedCardLink = data.cardUrl || '';
    closeOverlay('cardInfoOverlay');
    document.getElementById('successOverlay').classList.add('active');
  } catch (err) {
    alert('Xato: ' + err.message);
  }
}

function copyCardLink() {
  navigator.clipboard.writeText(_generatedCardLink).then(() => {
    alert('Link nusxalandi!');
  });
}

function initMap() {
  const mapEl = document.getElementById('ymap');
  if (!mapEl || mapEl._mapReady) return;
  mapEl._mapReady = true;

  const placeholder = document.getElementById('mapPlaceholder');
  if (placeholder) placeholder.style.display = 'none';

  const LAT = 41.2342, LNG = 69.2157;

  const map = L.map('ymap', {
    center: [LAT, LNG],
    zoom: 16,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map);

  const markerHtml = `
    <div style="
      width:16px;height:16px;
      background:#e8ff47;
      border-radius:50%;
      border:2.5px solid #000;
      box-shadow:0 0 0 4px rgba(232,255,71,0.25), 0 0 16px rgba(232,255,71,0.4);
    "></div>`;

  const icon = L.divIcon({
    className: '',
    html: markerHtml,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -14],
  });

  L.marker([LAT, LNG], { icon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'DM Sans',sans-serif;font-size:0.82rem;line-height:1.6;min-width:160px;">
        <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.3rem;">PDP School</div>
        <div style="color:#888;">Mashina bazar ko'chasi</div>
        <div style="color:#888;">Yangi Hayat, Sergeli, Toshkent</div>
      </div>
    `, { maxWidth: 220 })
    .openPopup();
}

window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initMap();
  _initOtpBoxes();
  setLanguage('en');
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => el.classList.add('visible'));
});

/* ══════════════════════════════════════════
   GOOGLE SIGN-IN
══════════════════════════════════════════ */
const GOOGLE_CLIENT_ID = '196351661484-ava56hi7hm2sh2t5lecbic76aud3h0sr.apps.googleusercontent.com';

function initGoogleSignIn() {
  if (typeof google === 'undefined') return;
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
    auto_select: false,
    cancel_on_tap_outside: true
  });
  renderGoogleBtn();
}

function renderGoogleBtn() {
  const container = document.getElementById('googleSignInBtn');
  if (!container) return;
  if (container.dataset.ready === '1') return;
  container.dataset.ready = '1';
  container.innerHTML = `
    <button class="google-btn" onclick="triggerGoogleSignIn()">
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      Google orqali kirish
    </button>`;
}

function triggerGoogleSignIn() {
  if (typeof google === 'undefined') {
    alert('Google yuklanmadi. Sahifani yangilang.');
    return;
  }
  google.accounts.id.prompt();
}

async function handleGoogleCredential(response) {
  try {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Google login xatosi');

    const _isSuperAdmin = data.isSuperAdmin === true
      || (data.email && data.email.toLowerCase() === 'whatififlydidy@gmail.com');
    const _isAdmin = _isSuperAdmin || data.isAdmin === true;

    currentUser = {
      id:          data.userId,
      token:       data.token,
      firstName:   data.firstName,
      lastName:    data.lastName,
      email:       data.email,
      isAdmin:     _isAdmin,
      isSuperAdmin: _isSuperAdmin
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    isSuperAdmin = _isSuperAdmin;

    closeOverlay('authOverlay');
    updateAuthUI();
  } catch (err) {
    alert('Google orqali kirish amalga oshmadi: ' + err.message);
  }
}

// Google GSI skript yuklanganda chaqiriladi
window.onGoogleLibraryLoad = initGoogleSignIn;

// Auth overlay ochilganda tugmani qayta render qilish
const _origOpenAuth = window.openAuth;
window.openAuth = function(tab) {
  if (_origOpenAuth) _origOpenAuth(tab);
  setTimeout(renderGoogleBtn, 100);
};

// ─────────────────────────────────────────────────────────────
//  TELEGRAM LOGIN
// ─────────────────────────────────────────────────────────────
const TELEGRAM_BOT_ID = '8390043232';

function triggerTelegramLogin() {
  const origin = encodeURIComponent(window.location.origin);
  const url = `https://oauth.telegram.org/auth?bot_id=${TELEGRAM_BOT_ID}&origin=${origin}&embed=1&request_access=write`;

  const popup = window.open(
    url,
    'TelegramLogin',
    'width=550,height=470,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no'
  );

  if (!popup) {
    alert("Popup bloklandi. Brauzerdagi popup ruxsatini yoqing.");
    return;
  }

  const onMessage = function(event) {
    if (event.origin !== 'https://oauth.telegram.org') return;
    const msg = event.data;
    if (msg && msg.event === 'auth_result') {
      window.removeEventListener('message', onMessage);
      if (popup && !popup.closed) popup.close();
      if (msg.result) {
        handleTelegramAuth(msg.result);
      }
    }
  };
  window.addEventListener('message', onMessage);
}

async function handleTelegramAuth(tgUser) {
  try {
    const res = await fetch(`${API_BASE}/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tgUser)
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Telegram login xatosi');

    const _isSuperAdmin = data.isSuperAdmin === true
      || (data.email && data.email.toLowerCase() === 'whatififlydidy@gmail.com');
    const _isAdmin = _isSuperAdmin || data.isAdmin === true;

    currentUser = {
      id:           data.userId,
      token:        data.token,
      firstName:    data.firstName,
      lastName:     data.lastName,
      email:        data.email || '',
      isAdmin:      _isAdmin,
      isSuperAdmin: _isSuperAdmin
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    isSuperAdmin = _isSuperAdmin;

    closeOverlay('authOverlay');
    updateAuthUI();
  } catch (err) {
    alert('Telegram orqali kirish amalga oshmadi: ' + err.message);
  }
}
