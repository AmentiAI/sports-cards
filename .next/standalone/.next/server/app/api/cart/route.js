"use strict";(()=>{var e={};e.id=453,e.ids=[453],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6642:(e,r,s)=>{s.r(r),s.d(r,{headerHooks:()=>g,originalPathname:()=>R,patchFetch:()=>h,requestAsyncStorage:()=>m,routeModule:()=>p,serverHooks:()=>_,staticGenerationAsyncStorage:()=>E,staticGenerationBailout:()=>y});var t={};s.r(t),s.d(t,{DELETE:()=>l,GET:()=>d,POST:()=>u});var a=s(5419),o=s(9108),c=s(9678),i=s(8070),n=s(7802);async function d(e){try{let{searchParams:r}=new URL(e.url),s=r.get("sessionId");if(!s)return i.Z.json({success:!1,error:"Session ID required"},{status:400});let t=`
      SELECT 
        ci.id, ci.session_id as "sessionId", ci.quantity,
        sc.id as "cardId", sc.name, sc.player, sc.team, sc.year, 
        sc.brand, sc.set_name as "set", sc.card_number as "cardNumber",
        sc.category, sc.condition, sc.price, sc.description,
        sc.image_url as "imageUrl", sc.back_image_url as "backImageUrl",
        sc.is_sold as "isSold"
      FROM cart_items ci
      JOIN sports_cards sc ON ci.card_id = sc.id
      WHERE ci.session_id = $1
      ORDER BY ci.created_at DESC
    `,a=await n.Z.query(t,[s]);return i.Z.json({success:!0,data:a.rows})}catch(e){return console.error("Error fetching cart:",e),i.Z.json({success:!1,error:"Failed to fetch cart"},{status:500})}}async function u(e){try{let{sessionId:r,cardId:s,quantity:t=1}=await e.json();if(!r||!s)return i.Z.json({success:!1,error:"Session ID and Card ID required"},{status:400});let a=await n.Z.query("SELECT id, quantity FROM cart_items WHERE session_id = $1 AND card_id = $2",[r,s]);if(a.rows.length>0){let e=a.rows[0].quantity+t,o=`
        UPDATE cart_items 
        SET quantity = $1, updated_at = CURRENT_TIMESTAMP
        WHERE session_id = $2 AND card_id = $3
        RETURNING *
      `,c=await n.Z.query(o,[e,r,s]);return i.Z.json({success:!0,data:c.rows[0],message:"Cart item updated"})}{let e=`
        INSERT INTO cart_items (session_id, card_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `,a=await n.Z.query(e,[r,s,t]);return i.Z.json({success:!0,data:a.rows[0],message:"Item added to cart"})}}catch(e){return console.error("Error adding to cart:",e),i.Z.json({success:!1,error:"Failed to add to cart"},{status:500})}}async function l(e){try{let{sessionId:r,cardId:s}=await e.json();if(!r||!s)return i.Z.json({success:!1,error:"Session ID and Card ID required"},{status:400});let t=await n.Z.query("DELETE FROM cart_items WHERE session_id = $1 AND card_id = $2 RETURNING id",[r,s]);if(0===t.rows.length)return i.Z.json({success:!1,error:"Cart item not found"},{status:404});return i.Z.json({success:!0,message:"Item removed from cart"})}catch(e){return console.error("Error removing from cart:",e),i.Z.json({success:!1,error:"Failed to remove from cart"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/cart/route",pathname:"/api/cart",filename:"route",bundlePath:"app/api/cart/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\cart\\route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:m,staticGenerationAsyncStorage:E,serverHooks:_,headerHooks:g,staticGenerationBailout:y}=p,R="/api/cart/route";function h(){return(0,c.patchFetch)({serverHooks:_,staticGenerationAsyncStorage:E})}},7802:(e,r,s)=>{s.d(r,{Z:()=>o});let t=require("pg"),a={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},o=new t.Pool(a)}};var r=require("../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[638,206],()=>s(6642));module.exports=t})();