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
  let $meet = $('#meet');
  let $form = $('#form');


  // $meet.on('click', function(e) {
  //   e.preventDefault();

  //   $form.css('visibility', 'hidden');
  // });


  $booked.on('click', function(e) {
    e.preventDefault();
    $display.html('');
    $.get('/bookings', function(response) {
      if (typeof response === 'object') {
        $.each(response, function(i, item) {
          renderBook(item);
        });
      } else {
        $display.html(response + '<h3 class="text-danger">No Appointments yet!!!</h3>');
      }
    });
  })

  function renderBook(obj) {
    let value = `<div class="well">
        <p><strong>Name: </strong>${obj.name}</p>
        <p><strong>Email: </strong>${obj.email}</p>
        <p><strong>Address: </strong>${obj.address}</p>
        <p><strong>Phone: </strong>${obj.phone}</p>
        <p><strong>Why I want to meet: </strong>${obj.reason}<span></span></p>
      </div>
    `;
    $display.append(value);
    return true;
  }

  function clearInput(a, b, c, d, e) {
    a.val('');
    b.val('');
    c.val('');
    d.val('');
    e.val('');
    return true;
  }

  function check(obj) {
    let car = $.find(obj, item => item.name === $name.val());
    console.log(car)
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
        clearInput($name, $email, $address, $phone, $reason);
        if (typeof response === 'object') {
          // $.each(response, function(i, item) {
          //   renderBook(item);
          // });
          console.log('done');
        } else {
          $feedback.html(response);
          // $.get('/bookings', function(response) {
          //   $.each(response, function(i, item) {
          //     renderBook(item);
          //   });
          // });
        }
      });

    } else {
      $feedback.html('<p><em>Please Complete Form</em></p>');
    }

  });

});