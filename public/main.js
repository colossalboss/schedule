$(function() {
  let $booked = $('#booked');
  let $display = $('#display');
  let $send = $('#send');
  let $name = $('#name');
  let $email = $('#email');
  let $address = $('#address');
  let $feedback = $('#feedback');

  // $booked.on('click', function(e) {
    // e.preventDefault();
    $.get('/bookings', function(response) {
      console.log(response);
      $.each(response, function(i, item) {
        $display.append('<div class="well"><p><strong>Name:</strong> ' + item.name + '</p><p><strong>Email:</strong> ' + item.email + '</p><p><strong>Address:</strong> ' + item.address + '</p></div>');
      });
    });
  // });

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
        address: $address.val()
      }

      $.post('/bookings', details, function(response) {
        $display.html('');
        clearInput($name, $email, $address);
        $.each(response, function(i, item) {
          $display.append('<div class="well"><p><strong>Name:</strong> ' + item.name + '</p><p><strong>Email:</strong> ' + item.email + '</p><p><strong>Address:</strong> ' + item.address + '</p></div>');
        });
      });

    } else {
      $feedback.html('<p><em>Please Complete Form</em></p>');
    }

  });

});