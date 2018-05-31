# non-blocking-array-cycle
Не блокирующий обработчик по массиву

Пример:
let arr = [Очень большой массив];
nonBlockArrayTransform(arr, (it) => Promise.resolve(it));