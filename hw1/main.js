// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here

    // const container = document.getElementsByClassName('.item_wrapper');
    // const parag = document.createElement('P');

    // img.setAttribute('width', '30%');
    const wrapper = document.querySelector('.narrow-wrapper');
    const block = document.createElement('div');
    block.setAttribute('class', 'item-block')

    for (let id=0; id < shirts.length; id++) {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var img = document.createElement('img');
        img.setAttribute('src', shirts[id].colors.white.front);
        var name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.setAttribute('id', 'font-type');
        name.textContent = shirts[id].name;

        var count_color = document.createElement('p');
        count_color.setAttribute('id', 'short');
        num = Object.keys(shirts[id].colors).length;
        count_color.textContent = 'Avaliable in ' + num + ' colors';

        var button = document.createElement('div');
        button.setAttribute('class', 'button');

        var Quick_View = document.createElement('input');
        Quick_View.setAttribute('type', 'button');
        Quick_View.setAttribute('value', 'Quick View');
        // Quick_View.setAttribute('id', 'qv');
        // Quick_View.setAttribute('onclick', "location.href='not_implemented.html'");
        Quick_View.addEventListener(
            "click",
            (event) => {
                var getQV=document.getElementById("QV_window");
                if (getQV) {getQV.parentNode.removeChild(getQV);}

                localStorage.setItem('detail', shirts[id].name);
                localStorage.setItem('id', id);
                item = localStorage.getItem('detail');
                id = localStorage.getItem('id');

                const QV_window = document.createElement('div');
                // QV_window.setAttribute('class', 'flex-no-wrap');
                QV_window.setAttribute('id', 'QV_window');

                var front = document.createElement('img');
                var back = document.createElement('img');
                front.setAttribute('src', shirts[id].colors.white.front);
                front.setAttribute('id', 'small-img');
                back.setAttribute('src', shirts[id].colors.white.back);
                back.setAttribute('id', 'small-img');

                const div = document.createElement('div');
                div.setAttribute('class', 'detail-block');
                var title = document.createElement('h3');
                title.setAttribute('id', 'font-type');
                title.setAttribute('id', 'narrow-margin');
                title.textContent = item;
                var price = document.createElement('h4');
                price.setAttribute('id', 'narrow-margin');
                price.textContent = shirts[id].price;
                var desc = document.createElement('p');
                desc.setAttribute('id', 'narrow-margin');
                desc.textContent = shirts[id].description;

                var button = document.createElement('div');
                button.setAttribute('class', 'button');

                var close = document.createElement('input');
                close.setAttribute('type', 'button');
                close.setAttribute('value', 'Close');

                close.addEventListener(
                    "click",
                    (event) => {
                        var getQV=document.getElementById("QV_window");
                        getQV.parentNode.removeChild(getQV);
                    }
                );

                button.appendChild(close);
                div.appendChild(title);
                div.appendChild(price);
                div.appendChild(desc);
                div.appendChild(button);
                QV_window.appendChild(front);
                QV_window.appendChild(back);
                QV_window.appendChild(div);
                wrapper.appendChild(QV_window);
            }
        );

        var detail = document.createElement('input');
        detail.setAttribute('type', 'button');
        detail.setAttribute('value', 'See Page');
        detail.setAttribute('onclick', "location.href='details.html'");

        detail.addEventListener(
            "click",
            (event) => {
                localStorage.setItem('detail', shirts[id].name);
                localStorage.setItem('id', id);
                localStorage.setItem('side', 'front');
                localStorage.setItem('color', 'white');
            }
        );

        button.appendChild(Quick_View);
        button.appendChild(detail);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(count_color);
        div.appendChild(button);
        block.appendChild(div);

    }
    wrapper.appendChild(block);
};

var f_b = localStorage.getItem("side");
var co = localStorage.getItem("color");
let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    const item = localStorage.getItem("detail");
    const id = localStorage.getItem("id");

    const wrapper = document.querySelector('.narrow-wrapper');
    const block = document.createElement('div');
    block.setAttribute('class', 'flex-no-wrap');

    var title = document.createElement('h1');
    title.setAttribute('id', 'font-type');
    title.textContent = item;

    var img = document.createElement('img');
    img.setAttribute('src', shirts[id].colors.white.front);
    img.setAttribute('id', 'detail-img');
    const div = document.createElement('div');
    div.setAttribute('class', 'detail-block');
    var price = document.createElement('h2');
    price.textContent = shirts[id].price;
    var desc = document.createElement('p');
    desc.textContent = shirts[id].description;

    var side = document.createElement('div');
    side.setAttribute('class', 'button');
    side.textContent = 'Side:';
    for (let i = 0; i < Object.keys(shirts[id].colors.white).length; i++) {
        var btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', Object.keys(shirts[id].colors.white)[i]);
        btn.addEventListener(
            "click",
            (event) => {
                localStorage.setItem('side', Object.keys(shirts[id].colors.white)[i]);
                f_b = localStorage.getItem('side');
                img.removeAttribute('src');
                img.setAttribute('src', shirts[id].colors[co][f_b]);
            }
        );
        side.appendChild(btn);
    }

    var color = document.createElement('div');
    color.textContent = 'Color: '
    color.setAttribute('class', 'button');
    for (let i = 0; i < Object.keys(shirts[id].colors).length; i++) {
        var btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', Object.keys(shirts[id].colors)[i]);
        btn.addEventListener(
            "click",
            (event) => {
                localStorage.setItem('color', Object.keys(shirts[id].colors)[i]);
                img.removeAttribute('src');
                co = localStorage.getItem('color');
                img.setAttribute('src', shirts[id].colors[co][f_b]);
            }
        );
        color.appendChild(btn);
    }

    f_b = localStorage.getItem('side');
    co = localStorage.getItem('color');

    div.appendChild(price);
    div.appendChild(desc);
    div.appendChild(side);
    div.appendChild(color);
    block.appendChild(img);
    block.appendChild(div);
    wrapper.appendChild(title);
    wrapper.appendChild(block);
};