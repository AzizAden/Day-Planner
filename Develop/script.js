$(function () {
  // Get main container
  let container = $('main.container');

  // Get moment.js info
  let weekday = moment().format('dddd');
  let dateString = moment().format('LL');
  let currentTime = moment();

  // Create hour block array
  let timeArr = [
    moment('9 AM', 'h A'),
    moment('10 AM', 'h A'),
    moment('11 AM', 'h A'),
    moment('12 PM', 'h A'),
    moment('1 PM', 'h A'),
    moment('2 PM', 'h A'),
    moment('3 PM', 'h A'),
    moment('4 PM', 'h A'),
    moment('5 PM', 'h A')
  ];

  // Have header show current weekday and full date
  $('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');

  // Loop through timeArr elements
  timeArr.forEach(function (i) {
    // Create hour block container
    let timeBlock = $('<section>').addClass('time-block row');
    if (currentTime.format('h A') === i.format('h A')) {
      timeBlock.addClass('current');
    } else if (currentTime.isBefore(i)) {
      timeBlock.addClass('future');
    }

    // Create time container
    let timeContainer = $('<article>').addClass('time col col-small');

    // Create circle
    let circle = $('<div>').addClass('circle');

    // Create hour block time
    let hour = $('<div>').addClass('hour').text(i.format('h A'));

    // Create event form
    let form = $('<form>').attr('method', 'post').addClass('col');

    // Create textarea within form
    let textarea = $('<textarea>').attr('id', 'time-' + i.format('hA'));

    // If events are stored, output them on page load
    let storageName = i.format('h A');
    let stored = localStorage.getItem(storageName);
    let height = localStorage.getItem(storageName + ' height');
    if (stored !== null) {
      textarea.val(stored).height(parseInt(height) + 20);
    }

    // Adjust textarea height if you input multiple lines
    textarea.on('input', function () {
      if ($(this).val() !== '') {
        $(this).css('height', $(this).prop('scrollHeight') + 'px');
      } else {
        $(this).css('height', '40px');
      }
    });

    // Allows you to shift+return in the textarea, but return submits the form
    textarea.keypress(function (event) {
      if (event.which == 13 && !event.shiftKey) {
        $(this).closest('form').submit();
        event.preventDefault();
      }
    });

    // On form submit, send the value of textarea to local storage
    form.on('submit', function (event) {
      event.preventDefault();
      let storedTime = textarea.val();
      if (storedTime === '') {
        return;
      }
      let textareaHeight = textarea.height();
      localStorage.setItem(storageName + ' height', textareaHeight);
      localStorage.setItem(storageName, storedTime);
    });

    // On form change, send the value of textarea to local storage
    form.on('change', function (event) {
      event.preventDefault();
      let storedTime = textarea.val();
      if (storedTime === '') {
        return;
      }
      let textareaHeight = textarea.height();
      localStorage.setItem(storageName + ' height', textareaHeight);
      localStorage.setItem(storageName, storedTime);
    });

    // Append all items
    form.append(textarea);
    timeContainer.append(circle, hour);
    timeBlock.append(timeContainer, form);
    container.append(timeBlock);

  });

  // Add border bottom to the last block in the loop
  $('#time-5PM').parent().css('border-bottom', '1px solid #ebebeb');

  // Get current, before, and after work hours
  let currentHour = currentTime.hour();
  let startHour = moment('9:00:00 AM', 'HH:mm:ss a').hour();
  let endHour = moment('6:00:00 PM', 'HH:mm:ss a').hour();

  // Change data if before, after, or during work hours
  if (currentHour < startHour) {
    $('header').css('background', '#000c4f');
    $('img').attr('src', './images/day-night.svg');

    let alert = $('<p>').attr('id', 'after-hours');
    alert.text('Not quite time to work yet! Check back at 9 AM.');
    $('main.container').append(alert);
  } else if (currentHour >= endHour) {
    $('header').css('background', '#000c4f');
    $('img').attr('src', './images/day-night.svg');

    let alert = $('<p>').attr('id', 'after-hours');
    alert.text('Good job today, see you tomorrow at 9 AM.');
    $('main.container').append(alert);
  } else {
    $('header').css('background', '#3B59FF');
    $('img').attr('src', './images/day-night.svg');
    $('#six .circle').css('background', '#3B59FF');
    $('#six .hour').css('color', '#1e1e1e');
  }
});

