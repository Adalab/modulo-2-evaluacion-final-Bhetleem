const g=document.querySelector(".js-input"),m=document.querySelector(".js-searchButton"),o=document.querySelector(".js-searchList");document.querySelector(".js-image");document.querySelector(".js-serieTitle");let n=document.querySelector(".js-favouritesList");const f=document.querySelector(".js-resetButton");let a=[];function h(e){e.preventDefault(),fetch(`https://api.jikan.moe/v4/anime?q=${g.value}`).then(r=>r.json()).then(r=>{const s=r.data;o.innerHTML="";for(const t of s){let l=t.images.jpg.image_url;l==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(l="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),o.innerHTML+=`
            <li class="js-li favourite serieCard" id=${t.mal_id}>
            <img class="js-image" src="${l}" alt="${t.title}">
            <h5 class="js-serieTitle">${t.title}</h5>
            </li>
            `,a.push(t);const u=document.querySelectorAll(".js-li");for(const d of u)d.addEventListener("click",j)}})}m.addEventListener("click",h);document.querySelectorAll(".favourite");function j(e){const r=e.currentTarget.id,s=a.find(t=>t.mal_id===parseInt(r));console.log(e.currentTarget),e.currentTarget.classList.toggle("selectedcard"),e.currentTarget.classList.toggle("serieCard"),document.querySelector(".js-closeButton"),i.push(s),n.innerHTML+=`
        <li class="serieCard">
        <button class="close js-closeButton">X</button>
        <img class="js-fav-image" src="${s.images.jpg.image_url}" alt="${s.title}">
        <h5 class="js-fav-serieTitle">${s.title}</h5>
        </li>
        `,localStorage.setItem("favouritesLocalStorage",JSON.stringify(i))}let c=JSON.parse(localStorage.getItem("favouritesLocalStorage")),i=c!==null?c:[];if(i!==null)for(const e of i)console.log(e),n.innerHTML+=`
        <li class="serieCard">
        <button class="close js-closeButton">X</button>
        <img class="js-fav-image" src="${e.images.jpg.image_url}" alt="${e.title}">
        <h5 class="js-fav-serieTitle">${e.title}</h5>
        </li>
        `;function v(){a=[],i=[],localStorage.clear()}f.addEventListener("click",v);
//# sourceMappingURL=main.js.map
