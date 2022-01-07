<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Uber</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
        <link rel="stylesheet" href="{{URL::asset('css/style.css')}}">

        <style>
            html, body {
                background: #1a202c;
                color: #fff;
            }
        </style>
    </head>
    <body class="container">
        <div id="app"></div>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
        <script>
            toastr.options.closeButton = true;
            toastr.options.preventDuplicates = false;
            toastr.options.progressBar = true;
            toastr.options.positionClass = 'toast-bottom-right';
        </script>

        <script src="{{URL::asset('js/jquery.mask.js')}}"></script>
        <script src="{{URL::asset('js/moment.min.js')}}"></script>
        <script src="{{URL::asset('js/script.js')}}"></script>

    </body>
</html>
