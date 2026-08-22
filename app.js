const WHATSAPP='917498169710';
const products=[
{id:1,name:'Airtight Kitchen Storage Containers – 14 Pcs.',category:'Storage',badge:'BESTSELLER',images:['assets/storage-container-1.jpeg','assets/storage-container-2.jpeg','assets/storage-container-3.jpeg','assets/storage-container-4.jpeg','assets/storage-container-5.jpeg'],image:'assets/storage-container-1.jpeg',desc:'Keep your pantry organized and food fresh for longer. BPA free, air-tight lids, durable and stackable containers.',features:['Airtight lids','BPA free','Stackable design','Clear body'],link:'https://fktr.in/A00I4I7'},
{id:2,name:'2-in-1 Oil Sprayer & Pour Bottle',category:'Kitchen',badge:'TRENDING',images:['assets/oil-sprayer-1.png','assets/oil-sprayer-2.jpeg','assets/oil-sprayer-3.jpeg','assets/oil-sprayer-4.jpeg','assets/oil-sprayer-5.jpeg','assets/oil-sprayer-6.jpeg'],image:'assets/oil-sprayer-1.png',desc:'Premium quality oil sprayer & pourer. Ideal for cooking, air frying, baking, salad, BBQ & more.',features:['Spray + pour','Fine mist','Leak-proof design','Easy to clean'],link:'https://fktr.in/BiMH68X'},
{id:3,name:'Premium Stainless Steel Bottle – 1 L',category:'Bottles',badge:'PREMIUM PICK',images:['assets/bottle-1.jpeg','assets/bottle-2.jpeg','assets/bottle-3.jpeg','assets/bottle-4.jpeg','assets/bottle-5.jpeg','assets/bottle-6.jpeg'],image:'assets/bottle-1.jpeg',desc:'Stylish 1-litre stainless steel bottle for office, gym, travelling and everyday hydration.',features:['1 Litre capacity','BPA free','Leak proof','Easy to carry','Non-toxic'],link:'https://fktr.in/l2lUkZq'},
{id:4,name:'Stainless Steel Food Storage Containers – 5 Pcs Set',category:'Storage',badge:'BESTSELLER',images:['assets/storage-set-1.jpeg','assets/storage-set-2.jpeg','assets/storage-set-3.jpeg','assets/storage-set-4.jpeg','assets/storage-set-5.jpeg'],image:'assets/storage-set-1.jpeg',desc:'Stainless steel storage set with lids for food, fruits, snacks and everyday kitchen organization.',features:['160 ml to 1000 ml','Dishwasher safe','Fridge & freezer safe','Rust free','BPA free','Made in India'],link:'https://fktr.in/tVzv2ts'}
];
let active='All';let cart=JSON.parse(localStorage.getItem('shambhoCartV6')||'[]');
const grid=document.getElementById('productGrid');
function render(){const list=active==='All'?products:products.filter(p=>p.category===active);grid.innerHTML=list.map(p=>`<article class="product"><div class="product-img"><span class="badge">${p.badge}</span><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><div class="product-cat">${p.category}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="actions"><button class="details" onclick="showProduct(${p.id})">View Details</button><button class="enquiry" onclick="ask(${p.id})">Enquiry</button></div></div></article>`).join('')}
function setFilter(f){active=f;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===f));render()}
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>setFilter(b.dataset.filter));
document.querySelectorAll('[data-filter-link]').forEach(a=>a.onclick=e=>{e.preventDefault();setFilter(a.dataset.filterLink);document.getElementById('shop').scrollIntoView({behavior:'smooth'});});
document.getElementById('searchBtn').onclick=()=>{const q=document.getElementById('searchInput').value.toLowerCase().trim();if(!q){setFilter('All');return}const list=products.filter(p=>(p.name+' '+p.category+' '+p.desc).toLowerCase().includes(q));grid.innerHTML=list.map(p=>`<article class="product"><div class="product-img"><span class="badge">${p.badge}</span><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><div class="product-cat">${p.category}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="actions"><button class="details" onclick="showProduct(${p.id})">View Details</button><button class="enquiry" onclick="ask(${p.id})">Enquiry</button></div></div></article>`).join('')||'<p>No matching products found.</p>';document.getElementById('shop').scrollIntoView({behavior:'smooth'});};
document.getElementById('categorySelect').onchange=e=>{const v=e.target.value;if(v==='Home & Living'){setFilter('Home & Living')}else setFilter(v)};
function ask(id){const p=products.find(x=>x.id===id);window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi ShambhoMART, I am interested in "'+p.name+'". Please share current details and offer.')}`,'_blank')}
function showProduct(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  const imgs=(p.images&&p.images.length?p.images:[p.image]).filter(Boolean);
  const body=document.getElementById('modalBody');
  body.innerHTML=`<div class="modal-content">
    <div class="gallery">
      <div class="gallery-main" id="galleryZoomBox"><img id="galleryMain" src="${imgs[0]}" alt="${p.name}"></div>
      <div class="gallery-zoom-hint">Move cursor over image to zoom • Click to lock</div>
      <div class="gallery-count">${imgs.length} product images</div>
      <div class="gallery-thumbs" id="galleryThumbs">${imgs.map((src,i)=>`<button type="button" class="gallery-thumb ${i===0?'active':''}" data-src="${src}" aria-label="Product image ${i+1}"><img src="${src}" alt="${p.name} view ${i+1}"></button>`).join('')}</div>
    </div>
    <div class="product-detail-copy"><div class="eyebrow">${p.badge} • ${p.category}</div><h2>${p.name}</h2><p>${p.desc}</p><ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><p><strong>Price:</strong> Check current offer on the partner store. We intentionally do not show fixed prices because offers can change.</p><div class="detail-actions"><a href="${p.link}" target="_blank" rel="noopener">Shop Now →</a><a class="wa" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi ShambhoMART, I want details for '+p.name)}" target="_blank" rel="noopener">WhatsApp Enquiry</a></div></div>
  </div>`;
  const thumbs=document.getElementById('galleryThumbs');
  thumbs.addEventListener('click',e=>{
    const btn=e.target.closest('.gallery-thumb'); if(!btn) return;
    const main=document.getElementById('galleryMain'); main.src=btn.dataset.src;
    document.querySelectorAll('.gallery-thumb').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    const box=document.getElementById('galleryZoomBox'); box.classList.remove('zoom-locked','zoom-hover'); main.style.transformOrigin='center center';
  });
  const box=document.getElementById('galleryZoomBox'); const main=document.getElementById('galleryMain');
  box.addEventListener('mousemove',e=>{const r=box.getBoundingClientRect();const x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));const y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));main.style.transformOrigin=`${x}% ${y}%`;box.classList.add('zoom-hover')});
  box.addEventListener('mouseleave',()=>{if(!box.classList.contains('zoom-locked'))box.classList.remove('zoom-hover')});
  box.addEventListener('click',()=>box.classList.toggle('zoom-locked'));
  // Exploded/full image view: clicking the selected main image opens a larger view.
  box.addEventListener('dblclick',()=>openExploded(main.src,p.name));
  document.getElementById('modal').classList.add('show'); document.body.classList.add('modal-open');
}
function openExploded(src,name){
  let viewer=document.getElementById('explodedViewer');
  if(!viewer){viewer=document.createElement('div');viewer.id='explodedViewer';viewer.className='exploded-viewer';viewer.innerHTML='<button class="exploded-close" aria-label="Close">×</button><div class="exploded-image-box"><img id="explodedImage" alt=""><div class="exploded-hint">Move cursor over image to zoom • Click to lock</div></div>';document.body.appendChild(viewer);
    const close=()=>{viewer.classList.remove('show');document.body.classList.remove('exploded-open')}; viewer.querySelector('.exploded-close').onclick=close; viewer.onclick=e=>{if(e.target===viewer)close()};
    const eb=viewer.querySelector('.exploded-image-box'),ei=viewer.querySelector('#explodedImage');
    eb.addEventListener('mousemove',e=>{const r=eb.getBoundingClientRect();const x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));const y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));ei.style.transformOrigin=`${x}% ${y}%`;eb.classList.add('zoom-hover')});
    eb.addEventListener('mouseleave',()=>{if(!eb.classList.contains('zoom-locked'))eb.classList.remove('zoom-hover')});
    eb.addEventListener('click',()=>eb.classList.toggle('zoom-locked'));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  viewer.querySelector('#explodedImage').src=src; viewer.querySelector('#explodedImage').alt=name; viewer.querySelector('.exploded-image-box').classList.remove('zoom-hover','zoom-locked'); viewer.classList.add('show'); document.body.classList.add('exploded-open');
}
document.getElementById('closeModal').onclick=()=>{document.getElementById('modal').classList.remove('show');document.body.classList.remove('modal-open')};document.getElementById('modal').onclick=e=>{if(e.target.id==='modal'){e.currentTarget.classList.remove('show');document.body.classList.remove('modal-open')}};
function updateCart(){document.getElementById('cartCount').textContent=cart.length;const box=document.getElementById('cartItems');box.innerHTML=cart.length?cart.map((id,i)=>{const p=products.find(x=>x.id===id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${p.category}</small></div><button class="remove" onclick="cart.splice(${i},1);saveCart()">Remove</button></div>`}).join(''):'<p style="padding:20px;color:#667085">Your selection is empty.</p>'}
function saveCart(){localStorage.setItem('shambhoCartV6',JSON.stringify(cart));updateCart()}
document.getElementById('cartBtn').onclick=()=>{document.getElementById('cartDrawer').classList.add('open');document.getElementById('overlay').classList.add('show')};document.getElementById('closeCart').onclick=closeCart;document.getElementById('overlay').onclick=closeCart;function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
document.getElementById('whatsappOrder').onclick=()=>{if(!cart.length)return alert('Please add products first.');const names=cart.map(id=>products.find(p=>p.id===id).name);window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi ShambhoMART, I want to enquire/order these products:\n\n• '+names.join('\n• '))}`,'_blank')};document.getElementById('clearCart').onclick=()=>{cart=[];saveCart()};
document.getElementById('year').textContent=new Date().getFullYear();render();updateCart();
