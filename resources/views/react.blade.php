<!-- resources/views/react.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>laravelView側タイトル</title>
    @viteReactRefresh
    @vite(['resources/views/index.tsx'])
</head>

<body>
    <!-- app.tsxの内容を追加する部分 -->
    <div id="app"></div>
</body>

</html>
