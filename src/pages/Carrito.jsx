import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/cart/CartItemRow";
import CartSummary from "../components/cart/CartSummary";
import { useNavigate } from "react-router-dom";
import UIkit from "uikit";

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

const CardWrapper = styled.div`
  ${({ theme }) => theme.cardBase(theme)}
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

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

const EmptyBox = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Carrito = () => {
    const theme = useTheme();
    const { cart, getSubtotal } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // Cierra el offcanvas si está abierto
        const offcanvas = UIkit.offcanvas("#mini-cart");
        if (offcanvas) offcanvas.hide();
    }, []);

    const subtotal = getSubtotal;
    const shipping = "A convenir";
    const total = subtotal;

    const handleFinalizarCompra = () => {
        if (!cart || cart.length === 0) {
            UIkit.notification({
                message: "Tu carrito está vacío",
                status: "warning",
                pos: "top-center",
            });
            return;
        }

        navigate("/checkout");
    };

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
                                    <a href="/productos" className="uk-button uk-button-default">
                                        Explorar productos
                                    </a>
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
                    {/* PASAMOS la función de validación desde Carrito */}
                    <CartSummary onCheckout={handleFinalizarCompra} />
                </div>
            </Grid>
        </Section>
    );
};

export default Carrito;
