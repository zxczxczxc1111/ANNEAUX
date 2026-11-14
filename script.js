const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const orderButtons = document.querySelectorAll('.order-button');
const chosenService = document.getElementById('chosen-service');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const subscribeForm = document.getElementById('subscribe-form');

let service = '';

menuButton.addEventListener('click', function () {
  navigation.classList.toggle('open');
  const opened = navigation.classList.contains('open');
  menuButton.setAttribute('aria-expanded', opened);
});

navigation.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

orderButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    service = button.dataset.service;
    chosenService.textContent = 'Вы выбрали: ' + service;
    chosenService.hidden = false;
  });
});

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = contactForm.elements.name.value.trim();
  const phone = contactForm.elements.phone.value.trim();
  const date = contactForm.elements.date.value.trim();
  const budget = contactForm.elements.budget.value.trim();

  if (name.length < 2) {
    formMessage.textContent = 'Введите ваше имя.';
    contactForm.elements.name.focus();
    return;
  }

  if (phone.replace(/\D/g, '').length < 10) {
    formMessage.textContent = 'Введите номер телефона полностью.';
    contactForm.elements.phone.focus();
    return;
  }

  if (date && !/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    formMessage.textContent = 'Укажите дату в формате ДД.ММ.ГГГГ.';
    contactForm.elements.date.focus();
    return;
  }

  const message = [
    'Здравствуйте! Хочу обсудить свадьбу.',
    'Имя: ' + name,
    'Телефон: ' + phone,
    'Дата свадьбы: ' + (date || 'Не выбрана'),
    'Бюджет: ' + (budget || 'Пока не определён')
  ];

  if (service) {
    message.push('Услуга: ' + service);
  }

  formMessage.textContent = 'Заявка подготовлена. Отправьте сообщение в WhatsApp.';
  const link = 'https://wa.me/79039776195?text=' + encodeURIComponent(message.join('\n'));
  window.open(link, '_blank', 'noopener,noreferrer');
});

subscribeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Подписка пока не подключена. Это демонстрационная форма.');
});
