const json=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export default async function handler(req){
 if(req.method!=='POST')return json(405,{error:'Method not allowed'});
 const {name,email,score,pdf}=await req.json().catch(()=>({}));
 if(typeof name!=='string'||name.trim().length<2||name.length>100)return json(400,{error:'Nama tidak valid.'});
 if(typeof email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return json(400,{error:'Alamat email tidak valid.'});
 if(!Number.isInteger(score)||score<70||score>100)return json(400,{error:'Nilai belum memenuhi syarat kelulusan.'});
 if(typeof pdf!=='string'||pdf.length>1800000||!pdf.startsWith('JVBER'))return json(400,{error:'Lampiran sertifikat tidak valid.'});
 if(!process.env.RESEND_API_KEY||!process.env.CERTIFICATE_FROM)return json(503,{error:'Layanan email belum dikonfigurasi oleh pengelola.'});
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CERTIFICATE_FROM,to:[email],subject:'Sertifikat Kelas Multiver Anda',html:`<p>Halo ${name.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))},</p><p>Selamat! Anda telah menyelesaikan Kelas Multiver dengan nilai <b>${score}/100</b>.</p><p>Sertifikat PDF Anda terlampir. Sertifikat ini merupakan bukti penyelesaian kelas non-akreditasi yang diterbitkan oleh Kelas Multiver.</p><p>Salam,<br/>Kelas Multiver</p>`,attachments:[{filename:'Sertifikat-Kelas-Multiver.pdf',content:pdf}]})});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)return json(502,{error:data.message||'Penyedia email gagal mengirim sertifikat.'});
 return json(200,{ok:true,id:data.id});
}