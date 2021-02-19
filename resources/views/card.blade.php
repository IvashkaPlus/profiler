<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <title>Profiler - Card</title>
</head>
<body>
    <div class="container align-content-center">
        <div class="card" style="width: 18rem; margin: auto">
            <img class="card-img-top" src={{$card['avatar']}} alt={card_name} />
            <div class="card-body">
                <h5 class="card-title">Имя: {{$card['first_name'] . ' ' . $card['last_name']}}</h5>
                <p class="card-text">Город: {{$card['city']}}</p>
                <p class="card-text">Университет: {{$card['university']}}</p>
                <a href="/" class="btn btn-primary">Назад</a>
            </div>
        </div>
    </div>
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>
