/**
 * Функция для не блокирующей обработки массива
 * @param {Array} data
 * @param {Function} transformFunction - функция трансформации элемента возвращает Promise
 * @return {Promise}
 */
function nonBlockArrayTransform(data, transformFunction) {
    return data.reduce((prom, it) => {
        return prom.then(d => {
            return new Promise((r, rj) => {
                setTimeout(() => {
                    /**
                     * Тут можно обработать элемент массива
                     * Пример:
                     * if (transformFunction) {
                     *     transformFunction(it).then(res => {d.push(res);r(d)})
                     * } else r(d)
                     *
                     * или
                     *
                     * let newIt = {...it};
                     * nonBlockArrayTransform(newIt.children).then(res => {newIt.children = res;d.push(newIt);r(d)})
                     *
                     */

                    let p = transformFunction(it) || Promise.resolve(it);
                    p.then(res => {
                        d.push(res);
                        r(d);
                    });
                });
            });
        });
    }, Promise.resolve([]));
}

export default nonBlockArrayTransform;