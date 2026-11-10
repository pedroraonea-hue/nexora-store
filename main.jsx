import React, { useMemo, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Search, ShoppingBag, Menu, X, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, Truck, Headphones, Heart, ChevronRight } from 'lucide-react'
import './style.css'

const products = [
  {id:1,name:'Fone Bluetooth Pulse',category:'Tecnologia',price:129.90,old:169.90,emoji:'🎧',tag:'Mais vendido',color:'lavender',desc:'Som envolvente, conexão sem fio e conforto para acompanhar sua rotina.'},
  {id:2,name:'Garrafa Térmica Urban',category:'Casa',price:79.90,old:99.90,emoji:'🥤',tag:'Oferta',color:'mint',desc:'Mantenha sua bebida na temperatura ideal durante o dia.'},
  {id:3,name:'Mochila Everyday',category:'Acessórios',price:159.90,old:null,emoji:'🎒',tag:'Novo',color:'peach',desc:'Design versátil com espaço para os itens essenciais.'},
  {id:4,name:'Smartwatch Fit Pro',category:'Tecnologia',price:219.90,old:259.90,emoji:'⌚',tag:'Destaque',color:'blue',desc:'Acompanhe atividades e notificações com praticidade.'},
  {id:5,name:'Luminária Moon',category:'Casa',price:89.90,old:null,emoji:'💡',tag:'',color:'yellow',desc:'Uma iluminação aconchegante para transformar seu ambiente.'},
  {id:6,name:'Óculos Solar Vibe',category:'Acessórios',price:99.90,old:129.90,emoji:'🕶️',tag:'Oferta',color:'pink',desc:'Um toque de estilo para os dias de sol.'},
  {id:7,name:'Kit Skincare Daily',category:'Beleza',price:119.90,old:null,emoji:'🧴',tag:'',color:'mint',desc:'Cuidados diários para uma rotina mais prática.'},
  {id:8,name:'Teclado Mecânico Mini',category:'Tecnologia',price:189.90,old:229.90,emoji:'⌨️',tag:'Popular',color:'lavender',desc:'Formato compacto para seu setup e produtividade.'}
]
const money = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
function App(){
  const [category,setCategory]=useState('Todos')
  const [query,setQuery]=useState('')
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('nexora-cart')||'{}')}catch{return {}}})
  const [drawer,setDrawer]=useState(false)
  const [selected,setSelected]=useState(null)
  const [checkout,setCheckout]=useState(false)
  const [notice,setNotice]=useState('')
  const [mobileMenu,setMobileMenu]=useState(false)
  useEffect(()=>localStorage.setItem('nexora-cart',JSON.stringify(cart)),[cart])
  const filtered=useMemo(()=>products.filter(p=>(category==='Todos'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())),[category,query])
  const count=Object.values(cart).reduce((a,b)=>a+b,0)
  const total=products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0)
  const add=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}))
  const change=(id,d)=>setCart(c=>{const n={...c,[id]:Math.max(0,(c[id]||0)+d)};if(!n[id])delete n[id];return n})
  const categories=['Todos','Tecnologia','Casa','Acessórios','Beleza']
  const toast=msg=>{setNotice(msg);setTimeout(()=>setNotice(''),2600)}
  return <><header className="header"><div className="topline">✨ OFERTAS E NOVIDADES PARA VOCÊ</div><div className="nav wrap">
    <button className="iconbtn mobile" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menu">{mobileMenu?<X/>:<Menu/>}</button>
    <a className="logo" href="#"><span className="logo-mark">N</span>NEXORA<span>STORE</span></a>
    <nav className={mobileMenu?'navlinks show':'navlinks'}>{['Início','Produtos','Ofertas'].map((x,i)=><a key={x} href={i===0?'#inicio':'#produtos'} onClick={()=>setMobileMenu(false)}>{x}</a>)}</nav>
    <button className="cartbtn" onClick={()=>setDrawer(true)}><ShoppingBag size={19}/><span className="cartlabel">Carrinho</span><b>{count}</b></button>
  </div></header>
  <main>
    <section className="hero wrap" id="inicio"><div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> SUA EXPERIÊNCIA DE COMPRA</div><h1>Descubra algo<br/><em>extraordinário.</em></h1><p>Produtos selecionados para deixar seu dia a dia mais prático, bonito e cheio de possibilidades.</p><a className="primary" href="#produtos">Explorar produtos <ArrowRight size={18}/></a><div className="hero-note"><span>✦</span> Novidades e escolhas para todos os dias</div></div><div className="hero-art"><div className="orbit orbit1"></div><div className="orbit orbit2"></div><div className="hero-product hp1">🎧</div><div className="hero-product hp2">⌚</div><div className="hero-product hp3">🎒</div><div className="hero-sticker">NOVA<br/>COLEÇÃO</div><div className="hero-glow"></div></div></section>
    <section className="benefits wrap"><div><Truck/><span><b>Entrega para todo o Brasil</b><small>Consulte condições no checkout</small></span></div><div><ShieldCheck/><span><b>Compra com tranquilidade</b><small>Informações claras e suporte</small></span></div><div><Headphones/><span><b>Atendimento</b><small>Estamos aqui para ajudar</small></span></div></section>
    <section className="products wrap" id="produtos"><div className="section-head"><div><div className="eyebrow">ESCOLHA O QUE COMBINA COM VOCÊ</div><h2>Explore a loja<span>.</span></h2></div><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produtos..."/></label></div>
    <div className="filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="grid">{filtered.map(p=><article className="product" key={p.id}><button className="wish" onClick={()=>toast('Lista de favoritos estará disponível em breve')} aria-label="Favoritar"><Heart size={18}/></button><button className={`product-art ${p.color}`} onClick={()=>setSelected(p)}><span>{p.emoji}</span>{p.tag&&<small>{p.tag}</small>}</button><div className="product-info"><small>{p.category}</small><button className="product-name" onClick={()=>setSelected(p)}>{p.name}</button><div className="price">{money(p.price)} {p.old&&<del>{money(p.old)}</del>}</div><button className="add" onClick={()=>{add(p.id);toast('Produto adicionado ao carrinho')}}><Plus size={16}/> Adicionar</button></div></article>)}</div>
    {filtered.length===0&&<div className="empty">Nenhum produto encontrado. Tente outra busca.</div>}
    </section>
    <section className="newsletter"><div className="wrap news-inner"><div><div className="eyebrow">FIQUE POR DENTRO</div><h2>Novidades que chegam<br/>primeiro até você.</h2><p>Cadastre-se para acompanhar lançamentos e ofertas.</p></div><form onSubmit={e=>{e.preventDefault();toast('Cadastro demonstrativo recebido!');e.target.reset()}}><input type="email" required placeholder="Seu melhor e-mail"/><button className="primary">Quero receber <ArrowRight size={17}/></button><small>Cadastro demonstrativo, sem envio de e-mails nesta versão.</small></form></div></section>
  </main>
  <footer><div className="wrap footer-inner"><a className="logo" href="#"><span className="logo-mark">N</span>NEXORA<span>STORE</span></a><p>Uma nova forma de descobrir seus favoritos.</p><small>© {new Date().getFullYear()} NEXORA STORE. Todos os direitos reservados.</small></div></footer>
  {drawer&&<div className="overlay" onClick={()=>setDrawer(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h3>Seu carrinho ({count})</h3><button className="iconbtn" onClick={()=>setDrawer(false)}><X/></button></div>{count===0?<div className="empty">Seu carrinho está vazio.<br/><a href="#produtos" onClick={()=>setDrawer(false)}>Explorar produtos</a></div>:<><div className="cartitems">{products.filter(p=>cart[p.id]).map(p=><div className="cartitem" key={p.id}><div className={`mini-art ${p.color}`}>{p.emoji}</div><div className="cartdesc"><b>{p.name}</b><strong>{money(p.price)}</strong><div className="qty"><button onClick={()=>change(p.id,-1)}><Minus size={14}/></button>{cart[p.id]}<button onClick={()=>change(p.id,1)}><Plus size={14}/></button></div></div><button className="remove" onClick={()=>setCart(c=>{const n={...c};delete n[p.id];return n})}>Remover</button></div>)}</div><div className="cart-bottom"><div className="total"><span>Subtotal</span><b>{money(total)}</b></div><button className="primary full" onClick={()=>{setDrawer(false);setCheckout(true)}}>Continuar <ArrowRight size={17}/></button><small>Frete e pagamento serão calculados em uma futura integração.</small></div></>}</aside></div>}
  {selected&&<div className="overlay" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><div className={`modal-art ${selected.color}`}>{selected.emoji}</div><div className="modal-info"><small>{selected.category}</small><h2>{selected.name}</h2><p>{selected.desc}</p><h3>{money(selected.price)}</h3><button className="primary full" onClick={()=>{add(selected.id);setSelected(null);toast('Produto adicionado ao carrinho')}}>Adicionar ao carrinho <Plus size={17}/></button></div></div></div>}
  {checkout&&<div className="overlay" onClick={()=>setCheckout(false)}><div className="modal checkout" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setCheckout(false)}><X/></button><div className="eyebrow">FINALIZAR COMPRA</div><h2>Quase lá!</h2><p>O carrinho está pronto, mas a loja ainda não possui integração com pagamentos ou processamento de pedidos.</p><div className="total"><span>Total dos produtos</span><b>{money(total)}</b></div><button className="primary full" onClick={()=>{setCheckout(false);toast('Checkout demonstrativo. Pagamentos ainda não estão ativos.')}}>Entendi</button></div></div>}
  {notice&&<div className="toast">{notice}</div>}
  </>
}
createRoot(document.getElementById('root')).render(<App/>)
