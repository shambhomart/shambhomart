const WHATSAPP = "917498169710";

const products = [
  {id:1, name:"Multi-Purpose Kitchen Chopper", category:"Kitchen", icon:"🥗", badge:"Bestseller", desc:"Fast, convenient chopping for everyday kitchen prep."},
  {id:2, name:"Smart Oil Dispenser", category:"Kitchen", icon:"🫗", badge:"Trending", desc:"A cleaner and more controlled way to pour cooking oil."},
  {id:3, name:"Kitchen Storage Container Set", category:"Storage", icon:"🫙", badge:"Premium Pick", desc:"Keep pantry essentials organised, fresh and easy to access."},
  {id:4, name:"Everyday Water Bottle", category:"Lifestyle", icon:"💧", badge:"Popular", desc:"A practical bottle for home, work, travel and daily use."},
  {id:5, name:"Home Organiser", category:"Home", icon:"🧺", badge:"Special Offer", desc:"Simple storage for a cleaner, more organised home."},
  {id:6, name:"Manual Food Prep Tool", category:"Kitchen", icon:"🔪", badge:"Trending", desc:"A useful everyday helper for quicker food preparation."},
  {id:7, name:"Multipurpose Storage Box", category:"Storage", icon:"📦", badge:"Smart Pick", desc:"Neat storage for household essentials and accessories."},
  {id:8, name:"Daily Utility Pick", category:"Lifestyle", icon:"✨", badge:"New", desc:"A practical product selected for everyday convenience."}
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
      <div class="product-image"><span class="badge">${p.badge}</span><span>${p.icon}</span></div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-actions">
          <button class="add" onclick="addToCart(${p.id})">Add to Selection</button>
          <button class="ask" onclick="askProduct(${p.id})">Ask</button>
        </div>
      </div>
    </article>`).join("");
}

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
