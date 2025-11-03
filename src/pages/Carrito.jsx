import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/cart/CartItemRow";
import CartSummary from "../components/cart/CartSummary";

/* ===== layout-only styles (la UI específica está en los componentes hijos) ===== */
const Section = styled.section`
  ${({ theme }) => theme.container(theme)}
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: ${({ theme }) => theme.spacing(6)};
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* Small wrapper card for the left column (keeps consistent spacing) */
const CardWrapper = styled.div`
  ${({ theme }) => theme.cardBase(theme)}
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

/* Table styling (kept minimal, column-specific styles are inside CartItemRow) */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
`;

const TH = styled.th`
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(2)}`};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
`;

/* Empty state box (simple) */
const EmptyBox = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Carrito = () => {
    const theme = useTheme();
    const { cart, getSubtotal } = useCart();

    const subtotal = getSubtotal;
    const shipping = "A convenir";
    const total = subtotal;

    // WhatsApp checkout: usa mismo número de contacto de Contacto
    const whatsappFull = "573108134117"; // +57 3108134117 -> no '+' ni espacios
    const buildWaMessage = () => {
        if (!cart || cart.length === 0) return "Hola, quiero hacer una compra";
        let lines = [`Hola, quiero finalizar esta compra en Cacharrería Bastidas:`, ""];
        cart.forEach((it, idx) => {
            const line = `${idx + 1}) ${it.nombre} x ${it.cantidad} - $${(it.precio * it.cantidad).toLocaleString("es-CO")}`;
            lines.push(line);
        });
        lines.push("", `Subtotal: $${subtotal.toLocaleString("es-CO")}`);
        lines.push("¿Cómo procedemos con el pago y la entrega?");
        return encodeURIComponent(lines.join("\n"));
    };
    const waHref = `https://wa.me/${whatsappFull}?text=${buildWaMessage()}`;

    return (
        <Section>
            <Grid>
                <div>
                    <CardWrapper>
                        <h2 style={{ marginTop: 0 }}>Tu carrito</h2>

                        {(!cart || cart.length === 0) ? (
                            <EmptyBox>
                                <h3>Tu carrito está vacío</h3>
                                <p>Explora los productos y agrégalos al carrito.</p>
                                <div style={{ marginTop: theme.spacing(3) }}>
                                    <a href="/productos" className="uk-button uk-button-default">Explorar productos</a>
                                </div>
                            </EmptyBox>
                        ) : (
                            <>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TH>Producto</TH>
                                            <TH>Precio unitario</TH>
                                            <TH>Cantidad</TH>
                                            <TH>Subtotal</TH>
                                            <TH></TH>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cart.map((item) => (
                                            <CartItemRow key={item.id} item={item} />
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </CardWrapper>
                </div>

                <div>
                    {/* El componente CartSummary ya renderiza su propia tarjeta */}
                    <CartSummary waHref={waHref} />
                </div>
            </Grid>
        </Section>
    );
};

export default Carrito;
