/* ShambhoMART: automatically use numbered product assets (1.webp, 2.webp, ...)
   without deleting or changing any existing product folders/files. */
(async function(){
  const maxImages=12;
  const extOrder=['webp','png','jpg','jpeg'];
  const asset=(folder,n,ext)=>`assets/${folder}/${n}.${ext}`;
  const exists=src=>new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>resolve(src);
    img.onerror=()=>resolve(null);
    img.src=src;
  });
  async function numbered(folder){
    const out=[];
    for(let n=1;n<=maxImages;n++){
      let found=null;
      for(const ext of extOrder){
        const src=asset(folder,n,ext);
        found=await exists(src);
        if(found)break;
      }
      if(found) out.push(found);
      else if(n>1) break;
    }
    return out;
  }
  if(!Array.isArray(window.products)) return;
  await Promise.all(window.products.filter(p=>p.folder).map(async p=>{
    const imgs=await numbered(p.folder);
    if(imgs.length){p.images=imgs;p.image=imgs[0];}
  }));
  if(typeof window.render==='function') window.render();
})();
