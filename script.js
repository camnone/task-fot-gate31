const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('could no fetch ${url}, status: ${res.status}');

    }
    return await res.json();
}

function card() {
    class Cards {
        constructor(id, title, body, parentSelector) {
            this.id = id,
                this.title = title,
                this.body = body,
                this.parent = document.querySelector(parentSelector),
                this.checkLength();
        };


        checkLength() {
            if (this.title.length >= 20) {
                this.title = `${this.title.slice(0,26)}...`
            }
        }

        render() {
            const element = document.createElement('div');
            element.classList.add('papper')


            element.innerHTML = `
            <div className="papper-containst">
            <h3 class="title"><span>${this.title}</span></h3>
            <p class="descr">${this.body}</p>
            </div>

                `;

            this.parent.append(element);
            const checkBox = document.createElement('label')
            checkBox.classList.add('checkbox-other')
            checkBox.innerHTML = `
            <input type="checkbox" name="checkbox" value = ${this.id}>
            <span></span>
            
            `;

            const toggle = document.querySelectorAll('.papper');
            const title = document.querySelector('.title')

            toggle.forEach(item => {
                item.append(checkBox);
            });

            toggle.forEach((item, i) => {
                item.addEventListener('change', (e) => {
                    if (e.target) {
                        if (e.target.checked) {
                            item.classList.add('bg');
                            item.querySelector('.title').classList.add('white-text');
                            item.querySelector('.descr').classList.add('white-text');

                        } else {
                            item.classList.remove('bg');
                            item.querySelector('.title').classList.remove('white-text');
                            item.querySelector('.descr').classList.remove('white-text');
                        }
                    }

                });
            });
        }
    }

    getResource('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
        .then(data => {
            data.forEach(({
                id,
                title,
                body,
            }) => {
                new Cards(id, title, body, '.wrapper').render();
            });
        });

}

card();