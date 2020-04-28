
$.validator.setDefaults( {
    submitHandler: function () {
        if (curDiv === document.getElementById('registerDiv')) {
            addNewUser();
            alert("New user added successfully!");
            show('loginDiv');
        }
       else if (curDiv === document.getElementById('loginDiv')) {
            if (checkIfUserExist()) {
                show("settingsDiv");
            }

        }
    }
} );
$( document ).ready( function () {
    $( "#signupForm" ).validate( {
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            datepicker: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                pwcheck:true
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },

        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            datepicker: {
                required: "Please provide a birth date",

            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                pwcheck: "Your password must include characters and digits"
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                equalTo: "Please enter the same password as above"

            },
            email: "Please enter a valid email address",
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
        }
    } );
} );
$( document ).ready( function () {
    $( "#loginForm" ).validate( {
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true,
            },
          },
            messages: {
                username: {
                    required: "Please enter a username",
                },
                password: {
                    required: "Please provide a password",
                }
            },
            errorElement: "em",
            errorPlacement: function (error, element) {
                // Add the `help-block` class to the error element
                error.addClass("help-block");

                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.parent("label"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            }
    } );
} );
/*
/!*	set datepicker today date*!/
$(function(){
    $.datepicker.setDefaults(
        $.extend( $.datepicker.regional[ '' ] )
    );
    $( '#datepicker' ).datepicker({maxDate:0});
});

/!*check date formate*!/
jQuery.validator.addMethod("validdate", function(value, element) {
    return this.optional(element) ||  /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
}, "Please enter valid date.");
*/

/*/!*check pass contain char and digits*!/*/
$.validator.addMethod("pwcheck", function(value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        && /[a-z]/.test(value) // has a lowercase letter
        && /\d/.test(value) // has a digit
});

