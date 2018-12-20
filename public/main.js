$(function() {
  let $booked = $('#booked');
  let $display = $('#display');
  let $send = $('#send');
  let $name = $('#name');
  let $email = $('#email');
  let $address = $('#address');
  let $feedback = $('#feedback');
  let $phone = $('#phone');
  let $reason = $('#reason');


  $.get('/bookings', function(response) {
    $scheduled = response;
    $.each(response, function(i, item) {
      $display.append('<div class="well"><p><strong>Name:</strong> ' + item.name + '</p><p><strong>Email:</strong> ' + item.email + '</p><p><strong>Address:</strong> ' + item.address + '</p></div>');
    });
  });


    function renderBook(obj) {
      let value = `<div class="well">
          <p><strong>Name: </strong>${obj.name}</p>
          <p><strong>Email: </strong>${obj.email}</p>
          <p><strong>Address: </strong>${obj.address}</p>
          <p><strong>Phone: </strong>${obj.phone}</p>
          <p><strong>Why I need to see you: </strong>${obj.reason}<span></span></p>
        </div>
      `;
      $display.append(value);
      return true;
    }

  function clearInput(a, b, c) {
    a.val('');
    b.val('');
    c.val('');
  }

  $send.on('click', function(e) {
    e.preventDefault();
    if ($name.val() && $email.val() && $address.val()) {
      $feedback.html('');
      let details = {
        name: $name.val(),
        email: $email.val(),
        address: $address.val(),
        phone: $phone.val(),
        reason: $reason.val()
      }

      $.post('/bookings', details, function(response) {
        $display.html('');
        clearInput($name, $email, $address);
        if (typeof response === 'object') {
          $.each(response, function(i, item) {
            renderBook(item);
          });
        } else {
          $feedback.html('Sorry! no more bookings allowed today.');
          $.get('/bookings', function(response) {
            $.each(response, function(i, item) {
              renderBook(item);
            });
          });
        }
      });

    } else {
      $feedback.html('<p><em>Please Complete Form</em></p>');
    }

  });

});