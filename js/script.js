document.addEventListener('DOMContentLoaded', () => {

    function switchingItems(bodyItem, parentItems) {
        const parent = document.querySelector(parentItems);
        const items = parent.querySelectorAll(bodyItem);
        const btnNext = parent.querySelector('.btn-next');
        const btnPrev = parent.querySelector('.btn-prev');
        const btnSubmit = parent.querySelector('.btn-submit');
        let current = 1;
        let itemsTotal = parent.querySelector('.calc__header-total');
        let itemsCurrent = parent.querySelector('.calc__header-current');
        const sumDefault = 4000;
        let totalList = [];
        let sum = [];
        const sumTotal = parent.querySelector('.calc__bottom-total > span');
        let total = 0;

        function calcSumTotal(arr, def) {
            total = arr.reduce((previousValue, item) => +previousValue + (+item), def);
            return total;
        }

        function setSumTotal(elem, totalSum) {
            elem.innerText = totalSum;
        }

        function fillingTotalList(list) {
            items.forEach((item, num) => {
                addTotalListDefauly(item);
                addTotalListclick(item, num);
            });
        }

        function addTotalListDefauly(item) {
            const inputsCheck = item.querySelectorAll('input[type="radio"]:checked');
            const textLabel = item.querySelectorAll('input[type="radio"]:checked + label > span');
            inputsCheck.forEach((input, i) => {
                sum.push(input.value);
                totalList.push(textLabel[i].innerText);
            });
        }

        function addTotalListclick(item, num) {
            const inputs = item.querySelectorAll('input[type="radio"]');
            const textLabelClick = item.querySelectorAll('input[type="radio"] + label > span');
            inputs.forEach((input, i) => {
                input.addEventListener('click', function (e) {
                    sum.splice(num, 1, input.value);
                    totalList.splice(num, 1, textLabelClick[i].innerText);
                    calcSumTotal(sum, sumDefault);
                    setSumTotal(sumTotal, total);
                });
            });
        }

        fillingTotalList(totalList);

        itemsTotal.innerText = items.length;

        function itemsCurrentUload() {
            itemsCurrent.innerText = current;
        }

        function hiddenItem(items) {
            items.forEach(item => {
                item.classList.add('hidden');
            });
        }

        function showItem(i = 0) {
            items[i].classList.add('show');
        }

        hiddenItem(items);
        showItem();

        calcSumTotal(sum, sumDefault);
        setSumTotal(sumTotal, total);

        function btnPrevDisable(trigger) {
            if (trigger == 1) {
                btnPrev.setAttribute('disabled', 'disabled');
            } else {
                btnPrev.removeAttribute('disabled');
            }
        }
        btnPrevDisable(current);

        function showBtnSubmit(t) {
            if (t == items.length) {
                btnSubmit.classList.remove('hidden');
                btnSubmit.classList.add('show');
                btnNext.classList.add('hidden');
                btnNext.classList.remove('show');
            } else {
                btnSubmit.classList.add('hidden');
                btnSubmit.classList.remove('show');
                btnNext.classList.add('show');
                btnNext.classList.remove('hidden');
            }
        }

        showBtnSubmit(current);

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            items[current - 1].classList.add('hidden');
            items[current - 1].classList.remove('show');
            items[current].classList.add('show', 'emergence');
            current += 1;
            btnPrevDisable(current);
            showBtnSubmit(current);
            itemsCurrentUload();
        });

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            items[current - 1].classList.add('hidden');
            items[current - 1].classList.remove('show');
            items[current - 2].classList.add('show');
            current -= 1;
            btnPrevDisable(current);
            showBtnSubmit(current);
            itemsCurrentUload();
        });

        function createFinalSelection(arr) {
            const finalChois = parent.querySelector('.calc__body-total-chois')
            arr.forEach(item => {
                const itemSpan = document.createElement('span');
                itemSpan.innerText = item;
                finalChois.append(itemSpan);
            });
        }

        createFinalSelection(totalList);

        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const calc = document.querySelector('.calc');
            const final = document.createElement('div');
            final.classList.add('calc__thanks', 'emergence');
            final.innerHTML = `               
                <span class="calc__body-thanks">
                    Спасибо!
                </span>
            `;
            calc.append(final);
            //delFinal(parent, final);
        });

        function delFinal(parent, finalDiv) {
            setTimeout(() => {
                parent.removeChild(finalDiv);
            },
                2000);
        }

    }

    switchingItems('.calc__body-item', '.calc');
});