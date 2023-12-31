import db from "../configs/db.js"
import cloudinary from "../configs/cloudinary.js"

export const addCertificado = async (req, res) => {
  const { nome_certificado, emissor, descricao, id_usuario } = req.body
  const insert = "INSERT INTO certificados (nome_certificado, emissor, descricao, url, id_usuario, id_url) VALUES (?,?,?,?,?,?)"

  if (!req.file || !id_usuario) {
    return res.status(400).json({ msg: "O campo de imagem é obrigatório." });
  } 

  try {
    let urlImg
    let id_url
    cloudinary.uploader.upload(req.file.path, function (err, result){
      if(err){
        return res.status(500).json({msg: "Erro ao cadastrar certificado.", err})
      }else{
        urlImg = result.secure_url
        id_url = result.public_id
        db.query(insert, [nome_certificado, emissor, descricao, urlImg, id_usuario, id_url],(erro) => {
          if (erro)
              return res.status(400).json({msg: "Erro ao cadastrar certificado.", erro})
          else   
              return res.status(201).json({msg: "Certificado cadastrado com sucesso."})
        })
      }
    })
  } catch (error) {
    return res.status(400).json({msg: "Erro ao cadastrar certificado.", erro})
  }
}

export const listarCertificados = async (req, res) => {
  const select = "SELECT id_certificado, nome_certificado, url FROM certificados WHERE id_usuario = ?"
  const { id_usuario } = req.body

  db.query(select, [id_usuario], (erro, certificados) => {
    if (erro)
        return res.status(500).json({msg: "Erro ao consultar certificados.", erro});
    else
        return res.status(200).json({msg: "Certificados consultados com sucesso", certificados});
  });
}

export const getInfoCert = async (req, res) => {
  const select = "SELECT * FROM certificados WHERE id_certificado = ?"
  const { id_certificado } = req.body

  db.query(select, [id_certificado], (erro, informacoes) => {
    if (erro)
        return res.status(500).json({msg: "Erro ao consultar certificado.", erro});
    else
        return res.status(200).json({msg: "Certificados consultados com sucesso", informacoes});
  });
}

export const editCertificado = async (req, res) => {
  // const { nome_certificado, emissor, descricao, id_certificado } = req.body
  // const select = "SELECT id_url FROM certificados WHERE id_certificado = ?"
  // const update = "UPDATE certificados SET (nome_certificado, emissor, descricao, urlImg, id_url) VALUES (?,?,?,?,?)"
  // try {
  //   if (req.file){
  //     db.query(select, [id_certificado],(erro, resultado) => {
  //       if (erro){
  //           return res.status(400).json({msg: "Erro ao consultar usuário.", erro})
  //       }else{
  //         let id_url = resultado[0].id_url
  //         cloudinary.uploader.destroy(id_url, function (err, result){
  //           if(err){
  //             return res.status(500).json({msg: "Erro ao editar imagem do certificado.", err})
  //           }
  //         })
  //       }
  //     })
  //     cloudinary.uploader.upload(req.file.path, function (err, result){
  //       if(err){
  //         return res.status(500).json({msg: "Erro ao atualizar certificado.", err})
  //       }else{
  //         let urlImg = result.secure_url
  //         let id_url = result.public_id
  //         db.query(update, [nome_certificado, emissor, descricao, urlImg, id_url],(erro) => {
  //           if (erro)
  //               return res.status(400).json({msg: "Erro ao atualizar certificado.", erro})
  //           else   
  //               return res.status(201).json({msg: "Certificado atualizado com sucesso."})
  //         })
  //       }
  //     })
  //   }

    
      
    

  // } catch (error) {
  //   return res.status(400).json({msg: "Erro ao cadastrar certificado.", erro})
  // }
}