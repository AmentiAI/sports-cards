"use strict";(()=>{var e={};e.id=808,e.ids=[808],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},9850:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>q,originalPathname:()=>y,patchFetch:()=>v,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g,staticGenerationBailout:()=>h});var s={};t.r(s),t.d(s,{GET:()=>_,POST:()=>f});var a=t(5419),o=t(9108),d=t(9678),i=t(8070),n=t(6082),c=t.n(n),u=t(7802);async function _(e){try{let r=e.headers.get("authorization");if(!r||!r.startsWith("Bearer "))return i.Z.json({success:!1,message:"No token provided"},{status:401});let t=r.substring(7);try{let r=c().verify(t,process.env.JWT_SECRET||"fallback-secret").userId,{searchParams:s}=new URL(e.url),a=s.get("type")||"received",o=`
        SELECT 
          to.*,
          offered_card.name as offered_card_name,
          offered_card.player as offered_card_player,
          offered_card.team as offered_card_team,
          offered_card.year as offered_card_year,
          offered_card.category as offered_card_category,
          offered_card.condition as offered_card_condition,
          offered_card.image_url as offered_card_image,
          requested_card.name as requested_card_name,
          requested_card.player as requested_card_player,
          requested_card.team as requested_card_team,
          requested_card.year as requested_card_year,
          requested_card.category as requested_card_category,
          requested_card.condition as requested_card_condition,
          requested_card.image_url as requested_card_image,
          initiator.username as initiator_username,
          initiator.reputation_score as initiator_reputation,
          receiver.username as receiver_username,
          receiver.reputation_score as receiver_reputation
        FROM trade_offers to
        JOIN sports_cards offered_card ON to.offered_card_id = offered_card.id
        JOIN sports_cards requested_card ON to.requested_card_id = requested_card.id
        JOIN users initiator ON to.initiator_id = initiator.id
        JOIN users receiver ON to.receiver_id = receiver.id
        WHERE ${"sent"===a?"to.initiator_id":"to.receiver_id"} = $1
        ORDER BY to.created_at DESC
      `,d=await u.Z.query(o,[r]);return i.Z.json({success:!0,data:d.rows})}catch(e){return i.Z.json({success:!1,message:"Invalid token"},{status:401})}}catch(e){return console.error("Error fetching trade offers:",e),i.Z.json({success:!1,message:"Internal server error"},{status:500})}}async function f(e){try{let r=e.headers.get("authorization");if(!r||!r.startsWith("Bearer "))return i.Z.json({success:!1,message:"No token provided"},{status:401});let t=r.substring(7);try{let r=c().verify(t,process.env.JWT_SECRET||"fallback-secret").userId,{receiverId:s,offeredCardId:a,requestedCardId:o,additionalCash:d=0,expiresAt:n}=await e.json();if(!s||!a||!o)return i.Z.json({success:!1,message:"Missing required fields"},{status:400});let _=await u.Z.query("SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2",[r,a]);if(0===_.rows.length)return i.Z.json({success:!1,message:"You do not own the offered card"},{status:403});let f=await u.Z.query("SELECT id FROM digital_card_ownership WHERE user_id = $1 AND card_id = $2",[s,o]);if(0===f.rows.length)return i.Z.json({success:!1,message:"The receiver does not own the requested card"},{status:403});if((await u.Z.query("SELECT id FROM trade_offers WHERE initiator_id = $1 AND receiver_id = $2 AND offered_card_id = $3 AND requested_card_id = $4 AND status = $5",[r,s,a,o,"pending"])).rows.length>0)return i.Z.json({success:!1,message:"You already have a pending offer for this trade"},{status:409});let l=await u.Z.query(`INSERT INTO trade_offers (
          initiator_id, receiver_id, offered_card_id, requested_card_id, 
          additional_cash, status, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,[r,s,a,o,d,"pending",n||null]);return i.Z.json({success:!0,message:"Trade offer sent successfully",offer:l.rows[0]})}catch(e){return i.Z.json({success:!1,message:"Invalid token"},{status:401})}}catch(e){return console.error("Error creating trade offer:",e),i.Z.json({success:!1,message:"Internal server error"},{status:500})}}let l=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/marketplace/trade-offers/route",pathname:"/api/marketplace/trade-offers",filename:"route",bundlePath:"app/api/marketplace/trade-offers/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\marketplace\\trade-offers\\route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:g,serverHooks:m,headerHooks:q,staticGenerationBailout:h}=l,y="/api/marketplace/trade-offers/route";function v(){return(0,d.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}},7802:(e,r,t)=>{t.d(r,{Z:()=>o});let s=require("pg"),a={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},o=new s.Pool(a)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,206,82],()=>t(9850));module.exports=s})();