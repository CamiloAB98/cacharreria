import styled from "@emotion/styled";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #00000066;
  backdrop-filter: blur(2px);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity .25s ease;
  z-index: 98;
`;

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 330px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -4px 0 14px rgba(0,0,0,.12);
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  transform: translateX(${({ open }) => (open ? "0" : "100%")});
  transition: transform .28s ease;
  z-index: 99;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

const Items = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
`;

const Item = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`;

const Thumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const Name = styled.div`
  font-weight: 600;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
`;

const QtyBtn = styled.button`
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: transparent;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.danger || "#e74c3c"};
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const CheckoutBtn = styled(Link)`
  display: block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(3)}`};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export default function MiniCart({ open, onClose }) {
    const { cart, increaseQty, decreaseQty, removeFromCart, getSubtotal } = useCart();
    const subtotal = getSubtotal;

    return (
        <>
            <Overlay open={open} onClick={onClose} />
            <Panel open={open}>
                <Top>
                    Carrito ({cart.length})
                    <FaTimes style={{ cursor: "pointer" }} onClick={onClose} />
                </Top>

                <Items>
                    {cart.length === 0 && <div>Tu carrito está vacío</div>}
                    {cart.map((item) => (
                        <Item key={item.id}>
                            <Thumb src={item.imagen} />
                            <div style={{ flex: 1 }}>
                                <Name>{item.nombre}</Name>

                                <QtyRow>
                                    <QtyBtn onClick={() => decreaseQty(item.id)}>-</QtyBtn>
                                    <div>{item.cantidad}</div>
                                    <QtyBtn onClick={() => increaseQty(item.id)}>+</QtyBtn>
                                </QtyRow>

                                <RemoveBtn onClick={() => removeFromCart(item.id)}>
                                    Eliminar
                                </RemoveBtn>
                            </div>
                        </Item>
                    ))}
                </Items>

                {cart.length > 0 && (
                    <>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                            Subtotal: ${subtotal.toLocaleString("es-CO")}
                        </div>
                        <CheckoutBtn to="/carrito" onClick={onClose}>
                            Finalizar compra
                        </CheckoutBtn>
                    </>
                )}
            </Panel>
        </>
    );
}
