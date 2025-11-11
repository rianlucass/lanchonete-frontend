import React from "react";
import categoriasDeLanches from "./lanches";

export default function Cardapio() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fffdf8",
        color: "#333",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#d35400",
          marginBottom: "40px",
          fontSize: "2rem",
        }}
      >
        🍔 <strong>Cardápio de Lanches</strong>
      </h1>

      {/* Grade principal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {/* --- SALGADOS --- */}
        <div style={cardStyle}>
          <h2 style={{ ...tituloCategoria, color: "#ad5031ff" }}>SALGADOS</h2>
          {Object.entries(categoriasDeLanches.Salgados).map(([tipo, itens]) => (
            <div key={tipo}>
              <h3 style={subtitulo}>{tipo}</h3>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- DOCES --- */}
        <div style={cardStyle}>
          <h2 style={{ ...tituloCategoria, color: "#ad5031ff" }}>DOCES</h2>
          {Object.entries(categoriasDeLanches.Doces).map(([tipo, itens]) => (
            <div key={tipo}>
              <h3 style={subtitulo}>{tipo.replace(/_/g, " ")}</h3>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- SANDUÍCHES --- */}
        <div style={cardStyle}>
          <h2 style={{ ...tituloCategoria, color: "#ad5031ff" }}>SANDUÍCHES</h2>
          {Object.entries(categoriasDeLanches.Sanduíches).map(([tipo, itens]) => (
            <div key={tipo}>
              <h3 style={subtitulo}>{tipo.replace(/_/g, " ")}</h3>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- LANCHES SAUDÁVEIS --- */}
        <div style={cardStyle}>
          <h2 style={{ ...tituloCategoria, color: "#ad5031ff" }}>LANCHES SAUDÁVEIS</h2>
          {Object.entries(categoriasDeLanches.Lanches_Saudaveis).map(([tipo, itens]) => (
            <div key={tipo}>
              <h3 style={subtitulo}>{tipo.replace(/_/g, " ")}</h3>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- BEBIDAS --- */}
        <div style={cardStyle}>
          <h2 style={{ ...tituloCategoria, color: "#ad5031ff" }}>BEBIDAS</h2>

          <h3 style={subtitulo}>Geladas</h3>
          {Object.entries(categoriasDeLanches.Bebidas.Geladas).map(([tipo, itens]) => (
            <div key={tipo}>
              <h4 style={subtituloSecundario}>{tipo.replace(/_/g, " ")}</h4>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3 style={subtitulo}>Quentes</h3>
          {Object.entries(categoriasDeLanches.Bebidas.Quentes).map(([tipo, itens]) => (
            <div key={tipo}>
              <h4 style={subtituloSecundario}>{tipo.replace(/_/g, " ")}</h4>
              <ul style={lista}>
                {itens.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.nome}</span> <strong>– R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  padding: "20px",
  transition: "transform 0.2s",
};

const tituloCategoria: React.CSSProperties = {
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "12px",
  borderBottom: "2px solid #eee",
  paddingBottom: "4px",
};

const subtitulo: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "12px",
  color: "#555",
};

const subtituloSecundario: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "6px",
  color: "#666",
};

const lista: React.CSSProperties = {
  listStyle: "none",
  paddingLeft: "10px",
  margin: "6px 0 0 0",
  lineHeight: "1.6",
};
