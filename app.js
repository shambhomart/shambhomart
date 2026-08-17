const WHATSAPP = "917498169710";

const products = [
  {
    id:1,
    name:"Airtight Kitchen Storage Container – 1.1L",
    category:"Storage",
    icon:"🫙",
    badge:"Bestseller",
    desc:"Smart, transparent storage for grains, snacks, spices and everyday kitchen essentials.",
    images:[
      "assets/storage-container-1.jpeg",
      "assets/storage-container-2.jpeg",
      "assets/storage-container-3.jpeg",
      "assets/storage-container-4.jpeg",
      "assets/storage-container-5.jpeg"
    ],
    features:["Airtight Seal","BPA Free Material","Stackable Design","Transparent Body"],
    size:"1.1 L",
    dimensions:"16 cm height × 10.5 cm width",
    link:"https://fktr.in/A00I4I7"
  }
];

let cart = JSON.parse(localStorage.getItem("shambhoCart") || "[]");
let activeFilter = "All";

const grid = document.getElementById("productGrid");
const count = document.getElementById("cartCount");
const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

function renderProducts(){
  const list = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-image">
        <span class="badge">${p.badge}</span>
        ${p.images ? `<img src="${p.images[0]}" alt="${p.name}">` : `<span>${p.icon}</span>`}
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-actions">
          <button class="add" onclick="showProduct(${p.id})">View Product</button>
          <button class="ask" onclick="askProduct(${p.id})">WhatsApp</button>
        </div>
      </div>
    </article>`).join("");
}


function showProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  const modal = document.getElementById("productModal");
  modal.querySelector(".modal-gallery").innerHTML = p.images.map((img,i) =>
    `<button class="thumb ${i===0?'selected':''}" onclick="selectProductImage('${img}', this)">
      <img src="${img}" alt="${p.name} image ${i+1}">
    </button>`).join("");
  modal.querySelector(".main-product-image").src = p.images[0];
  modal.querySelector(".modal-title").textContent = p.name;
  modal.querySelector(".modal-desc").textContent = p.desc;
  modal.querySelector(".modal-features").innerHTML = p.features.map(x=>`<li>✓ ${x}</li>`).join("");
  modal.querySelector(".modal-size").textContent = `${p.size} • ${p.dimensions}`;
  modal.querySelector(".modal-shop").href = p.link;
  modal.classList.add("show");
}
function selectProductImage(img, btn){
  document.querySelector(".main-product-image").src = img;
  document.querySelectorAll(".thumb").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");
}
function closeProduct(){ document.getElementById("productModal").classList.remove("show"); }

function save(){ localStorage.setItem("shambhoCart", JSON.stringify(cart)); updateCart(); }
function updateCart(){
  count.textContent = cart.length;
  const box = document.getElementById("cartItems");
  if(!cart.length){ box.innerHTML = '<div class="empty">Your selection is empty.<br>Add products you like and continue on WhatsApp.</div>'; return; }
  box.innerHTML = cart.map((id,i)=>{
    const p = products.find(x=>x.id===id);
    return `<div class="cart-item"><div class="icon">${p.icon}</div><div><h4>${p.name}</h4><small>${p.category}</small></div><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`;
  }).join("");
}
function addToCart(id){ cart.push(id); save(); openCart(); }
function removeFromCart(i){ cart.splice(i,1); save(); }
function clearCart(){ cart=[]; save(); }
function askProduct(id){
  const p=products.find(x=>x.id===id);
  const text=`Hi ShambhoMART, I am interested in "${p.name}". Please share details and the current offer.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank");
}
function openCart(){drawer.classList.add("open");overlay.classList.add("show");drawer.setAttribute("aria-hidden","false");}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show");drawer.setAttribute("aria-hidden","true");}

document.querySelectorAll(".filter,.category-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    activeFilter=btn.dataset.filter;
    document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));
    document.getElementById("shop").scrollIntoView({behavior:"smooth"});
    renderProducts();
  });
});
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById("clearCart").onclick=clearCart;
document.getElementById("whatsappOrder").onclick=()=>{
  if(!cart.length){alert("Please add at least one product.");return;}
  const names=cart.map(id=>products.find(p=>p.id===id).name);
  const text=`Hi ShambhoMART, I want to enquire/order these products:%0A%0A• ${names.join("%0A• ")}%0A%0APlease share current details and offer.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts(); updateCart();

document.getElementById("closeProduct").onclick=closeProduct;
document.getElementById("productModal").addEventListener("click", e => {
  if(e.target.id === "productModal") closeProduct();
});
