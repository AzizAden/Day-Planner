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
    moment('5 PM', 'h A'),
    moment('6 PM', 'h A')
  ];

  // Have header show current weekday and full date
  $('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');

  // Loop through timeArr elements
  timeArr.forEach(function (i) {
    // Create hour block container
    let timeBlock = $('<div>').addClass('row time-block');
    if (currentTime.format('h A') === i.format('h A')) {
      timeBlock.addClass('present');
    } else if (currentTime.isBefore(i)) {
      timeBlock.addClass('future');
    } else {
      timeBlock.addClass('past');
    }

    // Create time container
    let timeContainer = $('<div>').addClass('hour col-md-2').text(i.format('h A'));

    // Create event form
    let form = $('<div>').addClass('col-md-8 input-group');

    // Create textarea within form
    let textarea = $('<textarea>').addClass('form-control description').attr('id', 'time-' + i.format('hA'));

    // If events are stored, output them on page load
    let storageName = i.format('h A');
    let stored = localStorage.getItem(storageName);
    if (stored !== null) {
      textarea.val(stored);
    }

    // Create save button
    let saveBtn = $('<button>').addClass('btn saveBtn col-md-2').attr('aria-label', 'save');
    let saveIcon = $('<i>').addClass('fas fa-save');
    saveBtn.append(saveIcon);

    // On save button click, save the value of textarea to local storage
    saveBtn.on('click', function () {
      let storedTime = textarea.val();
      localStorage.setItem(storageName, storedTime);
    });

    // Append all items
    form.append(textarea);
    timeBlock.append(timeContainer, form, saveBtn);
    container.append(timeBlock);
  });
});
