window.addEventListener("load", () => {

    let ajaxClass = new AjaxClass();

    ajaxClass.carregarContingut('/Server/comunitats.php','GET',null,function (text){
        let tags = text.getElementsByTagName('ca');
        let desplegable = document.getElementById('ca_name');
        let optBuit = document.createElement('option');
        optBuit.value = '-1';
        optBuit.innerText = '';
        desplegable.appendChild(optBuit);
        for(let tag of tags){
            let codi = tag.children[0].textContent;
            let nom = tag.children[1].textContent;
            let opt = document.createElement('option');
            opt.value = codi;
            opt.innerText = nom;
            desplegable.appendChild(opt);
        }
    })

    document.getElementById('ca_name').addEventListener('change',
        function (event) {

            console.log(event.target.value);

            ajaxClass.carregarContingut('/Server/provinciesByComunitat.php', 'POST', 'codiCom=' + event.target.value, function (text) {

                document.getElementsByClassName('hidden')[0].classList.add("hidden");
                document.getElementsByClassName('hidden')[1].classList.add("hidden");
                let tags = text.getElementsByTagName('prov')

                let provincies = document.getElementById('pr_name');
                provincies.innerText = "";
                let illes = document.getElementById('il_name');
                illes.innerText = '';
                let municipis = document.getElementById('mu_name');
                municipis.innerText = '';

                provincies.length = 0;
                let optBuit = document.createElement('option');
                optBuit.value = '-1';
                optBuit.innerText = '';
                provincies.disabled = false;
                provincies.appendChild(optBuit);

                for(let tag of tags){
                    let codiCom = tag.children[0].textContent;
                    let nom = tag.children[1].textContent;
                    let opt = document.createElement('option');
                    opt.value = codiCom;
                    opt.innerText = nom;
                    provincies.appendChild(opt);
                }
            });

            document.getElementById('pr_name').addEventListener('change',
                function (event) {
                    ajaxClass.carregarContingut('/Server/illes.php','POST','codiProv='+event.target.value,function (text) {

                        if (!(text.getElementsByTagName('illa').length>0)){
                            document.getElementsByClassName('hidden')[0].classList.add("hidden");
                            document.getElementsByClassName('hidden')[1].classList.add("hidden");

                            document.getElementById("mu_name").options.length=0;
                            ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiProv=' + event.target.value, function (text) {
                                let tags = text.getElementsByTagName('mun');
                                let municipi = document.getElementById('mu_name');
                                municipi.innerText = '';
                                municipi.length = 0;
                                let optBuit = document.createElement('option');
                                console.log(text)
                                optBuit.value = '-1';
                                optBuit.innerText = '';
                                municipi.disabled = false;
                                municipi.appendChild(optBuit);
                                console.log(event.target.value)
                                for (let tag of tags) {
                                    let codi = tag.children[0].textContent;
                                    let nom = tag.children[1].textContent;
                                    let opt = document.createElement('option');
                                    opt.value = codi;
                                    opt.innerText = nom;
                                    municipi.appendChild(opt);
                                }
                            });

                        }else {
                            document.getElementById('il_name').addEventListener('change',
                                function (event) {
                                    ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiIlla=' + event.target.value, function (text) {
                                        let tags = text.getElementsByTagName('mun');
                                        let municipi = document.getElementById('mu_name');
                                        municipi.innerText = '';
                                        municipi.length = 0;
                                        let optBuit = document.createElement('option');
                                        console.log(text)
                                        optBuit.value = '-1';
                                        optBuit.innerText = '';
                                        municipi.disabled = false;
                                        municipi.appendChild(optBuit);
                                        console.log(event.target.value)
                                        for (let tag of tags) {
                                            let codi = tag.children[0].textContent;
                                            let nom = tag.children[1].textContent;
                                            let opt = document.createElement('option');
                                            opt.value = codi;
                                            opt.innerText = nom;
                                            municipi.appendChild(opt);
                                        }
                                    })
                                })

                            document.getElementsByClassName('hidden')[0].classList.remove("hidden");

                            let tags = text.getElementsByTagName('illa');
                            let illes = document.getElementById('il_name');
                            illes.length = 0;
                            let optBuit = document.createElement('option');
                            optBuit.value = '-1';
                            optBuit.innerText = '';
                            illes.className = "";
                            illes.appendChild(optBuit);
                            for (let tag of tags) {
                                let codi = tag.children[0].textContent;
                                let nom = tag.children[1].textContent;
                                let opt = document.createElement('option');
                                opt.value = codi;
                                opt.innerText = nom;
                                illes.appendChild(opt);
                            }

                        }
                    })

                })
        })
});