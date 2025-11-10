import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

/* ---------- Estilos base ---------- */
const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textDark};
    font-weight: 600;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
`;

const Price = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalBox = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalRow = styled(Row)`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

/* ---------- Componente principal ---------- */
const OrderSummary = ({ cartItems = [] }) => {
  const theme = useTheme();
  const [totals, setTotals] = useState({
    subtotal: 0,
    envio: 0,
    total: 0,
  });

  useEffect(() => {
    // Calcula totales en base a la prop recibida
    const subtotalCalc = (cartItems || []).reduce(
      (sum, item) => sum + (Number(item.precio || item.price || 0) * Number(item.cantidad || item.quantity || 1)),
      0
    );
    const envioCalc = subtotalCalc > 100000 ? 0 : 8000;
    const totalCalc = subtotalCalc + envioCalc;

    setTotals({
      subtotal: subtotalCalc,
      envio: envioCalc,
      total: totalCalc,
    });
  }, [cartItems]);

  return (
    <SummaryBox>
      <ItemList>
        {(!cartItems || cartItems.length === 0) ? (
          <p className="uk-text-center uk-text-muted uk-margin-small">
            Tu carrito está vacío.
          </p>
        ) : (
          cartItems.map((item, idx) => (
            <Item key={idx}>
              <ItemInfo>
                <ItemImage
                  src={item.imagen || item.image || "/assets/images/placeholder.jpg"}
                  alt={item.nombre || item.name || "Producto"}
                />
                <ItemText>
                  <span>{item.nombre || item.name}</span>
                  <small>
                    {item.cantidad || item.quantity} × ${Number(item.precio || item.price).toLocaleString("es-CO")}
                  </small>
                </ItemText>
              </ItemInfo>
              <Price>
                ${((Number(item.precio || item.price) || 0) * (Number(item.cantidad || item.quantity) || 1)).toLocaleString("es-CO")}
              </Price>
            </Item>
          ))
        )}
      </ItemList>

      {/* --- Totales --- */}
      <TotalBox>
        <Row>
          <span>Subtotal</span>
          <span>${totals.subtotal.toLocaleString("es-CO")}</span>
        </Row>
        <Row>
          <span>Envío</span>
          <span>{totals.envio === 0 ? "Gratis" : `$${totals.envio.toLocaleString("es-CO")}`}</span>
        </Row>
        <TotalRow>
          <span>Total</span>
          <span>${totals.total.toLocaleString("es-CO")}</span>
        </TotalRow>
      </TotalBox>
    </SummaryBox>
  );
};

export default OrderSummary;
