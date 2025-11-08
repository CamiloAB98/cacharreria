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
  box-shadow: var(--shadow-sm);
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
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textDark};
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
`;

const Price = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
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

const OrderSummary = ({ formData }) => {
    const theme = useTheme();
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        subtotal: 0,
        envio: 0,
        total: 0,
    });

    useEffect(() => {
        // Simula obtener el carrito del localStorage o un hook global
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        setCartItems(carrito);

        const subtotalCalc = carrito.reduce(
            (sum, item) => sum + item.precio * item.cantidad,
            0
        );
        const envioCalc = subtotalCalc > 100000 ? 0 : 8000;
        const totalCalc = subtotalCalc + envioCalc;

        setTotals({
            subtotal: subtotalCalc,
            envio: envioCalc,
            total: totalCalc,
        });
    }, []);

    return (
        <SummaryBox>
            <ItemList>
                {cartItems.length === 0 ? (
                    <p className="uk-text-center uk-text-muted uk-margin-small">
                        Tu carrito está vacío.
                    </p>
                ) : (
                    cartItems.map((item, idx) => (
                        <Item key={idx}>
                            <ItemInfo>
                                <ItemImage src={item.imagen || "/placeholder.jpg"} alt={item.nombre} />
                                <ItemText>
                                    <span>{item.nombre}</span>
                                    <small>
                                        {item.cantidad} × ${item.precio.toLocaleString("es-CO")}
                                    </small>
                                </ItemText>
                            </ItemInfo>
                            <Price>${(item.precio * item.cantidad).toLocaleString("es-CO")}</Price>
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
                    <span>
                        {totals.envio === 0 ? "Gratis" : `$${totals.envio.toLocaleString("es-CO")}`}
                    </span>
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
