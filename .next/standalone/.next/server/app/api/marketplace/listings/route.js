"use strict";(()=>{var e={};e.id=457,e.ids=[457],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},5597:(e,s,r)=>{r.r(s),r.d(s,{headerHooks:()=>y,originalPathname:()=>E,patchFetch:()=>f,requestAsyncStorage:()=>m,routeModule:()=>g,serverHooks:()=>h,staticGenerationAsyncStorage:()=>_,staticGenerationBailout:()=>N});var t={};r.r(t),r.d(t,{GET:()=>d,POST:()=>p});var a=r(5419),i=r(9108),n=r(9678),c=r(8070),u=r(6082),o=r.n(u),l=r(7802);async function d(e){try{let{searchParams:s}=new URL(e.url),r=s.get("userId"),t=s.get("cardId"),a=s.get("type"),i=s.get("active"),n=`
      SELECT 
        ml.*,
        sc.name as card_name,
        sc.player,
        sc.team,
        sc.year,
        sc.brand,
        sc.set_name as "set",
        sc.card_number as "cardNumber",
        sc.category,
        sc.condition,
        sc.card_type as "cardType",
        sc.status,
        sc.digital_price as "digitalPrice",
        sc.physical_price as "physicalPrice",
        sc.image_url as "imageUrl",
        sc.back_image_url as "backImageUrl",
        u.username as seller_username,
        u.reputation_score as seller_reputation
      FROM marketplace_listings ml
      JOIN sports_cards sc ON ml.card_id = sc.id
      JOIN users u ON ml.user_id = u.id
      WHERE 1=1
    `,u=[],o=0;r&&(o++,n+=` AND ml.user_id = $${o}`,u.push(r)),t&&(o++,n+=` AND ml.card_id = $${o}`,u.push(t)),a&&(o++,n+=` AND ml.listing_type = $${o}`,u.push(a)),"true"===i&&(n+=" AND ml.is_active = true AND (ml.expires_at IS NULL OR ml.expires_at > NOW())"),n+=" ORDER BY ml.created_at DESC";let d=await l.Z.query(n,u);return c.Z.json({success:!0,data:d.rows})}catch(e){return console.error("Error fetching listings:",e),c.Z.json({success:!1,message:"Failed to fetch listings"},{status:500})}}async function p(e){try{let s=e.headers.get("authorization");if(!s||!s.startsWith("Bearer "))return c.Z.json({success:!1,message:"No token provided"},{status:401});let r=s.substring(7);try{let s=o().verify(r,process.env.JWT_SECRET||"fallback-secret").userId,{cardId:t,listingType:a,price:i,quantity:n=1,description:u,expiresAt:d}=await e.json();if(!t||!a||!i)return c.Z.json({success:!1,message:"Missing required fields"},{status:400});let p=await l.Z.query("SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2",[s,t]);if(0===p.rows.length)return c.Z.json({success:!1,message:"You do not own this card"},{status:403});let g=await l.Z.query(`INSERT INTO marketplace_listings (
          user_id, card_id, listing_type, price, quantity, description, 
          is_active, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,[s,t,a,i,n,u,!0,d||null]);return c.Z.json({success:!0,message:"Listing created successfully",listing:g.rows[0]})}catch(e){return c.Z.json({success:!1,message:"Invalid token"},{status:401})}}catch(e){return console.error("Error creating listing:",e),c.Z.json({success:!1,message:"Internal server error"},{status:500})}}let g=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/marketplace/listings/route",pathname:"/api/marketplace/listings",filename:"route",bundlePath:"app/api/marketplace/listings/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\marketplace\\listings\\route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:m,staticGenerationAsyncStorage:_,serverHooks:h,headerHooks:y,staticGenerationBailout:N}=g,E="/api/marketplace/listings/route";function f(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:_})}},7802:(e,s,r)=>{r.d(s,{Z:()=>i});let t=require("pg"),a={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},i=new t.Pool(a)}};var s=require("../../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[638,206,82],()=>r(5597));module.exports=t})();