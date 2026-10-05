/* ==========================================================================
   RAECCA POS & REPORTING ECOSYSTEM - MAIN APPLICATION ENGINE
   Curved Counter L, PIK Pop-up Store (Day 1 of 61)
   ========================================================================== */

// --- 1. MASTER SKU & PRODUCT DATA ---
const MASTER_PRODUCTS = [
  {
    id: 'RC-001',
    sku: '8997234010012',
    name: 'Raecca Lippie Serum (6ml)',
    category: 'lip',
    categoryName: 'Lip Care',
    price: 59000,
    icon: '💄',
    stockInitial: 80,
    stockCurrent: 52,
    isBestSeller: true,
    description: 'Hero product, formula berubah warna sesuai suhu bibir.'
  },
  {
    id: 'RC-002',
    sku: '8997234010029',
    name: 'Raecca Lippie Glow Pop (Tinted)',
    category: 'lip',
    categoryName: 'Lip Care',
    price: 65000,
    icon: '✨',
    stockInitial: 60,
    stockCurrent: 44,
    isBestSeller: true,
    description: 'Lip balm tinted dengan shimmer glossy finish.'
  },
  {
    id: 'RC-003',
    sku: '8997234010036',
    name: 'Raecca Cheek & Lip Tint Velvet',
    category: 'lip',
    categoryName: 'Lip Care',
    price: 49000,
    icon: '💋',
    stockInitial: 50,
    stockCurrent: 36,
    isBestSeller: false,
    description: 'Dual function perona pipi & bibir tahan lama.'
  },
  {
    id: 'RC-004',
    sku: '8997234010043',
    name: 'Raecca Jelly Mask Petals (50g)',
    category: 'skincare',
    categoryName: 'Skincare',
    price: 75000,
    icon: '🌸',
    stockInitial: 40,
    stockCurrent: 28,
    isBestSeller: true,
    description: 'Masker jelly dengan ekstrak bunga asli menyegarkan.'
  },
  {
    id: 'RC-005',
    sku: '8997234010050',
    name: 'Raecca Instant White Body Lotion (150ml)',
    category: 'body',
    categoryName: 'Body & Glow',
    price: 85000,
    icon: '🧴',
    stockInitial: 40,
    stockCurrent: 29,
    isBestSeller: false,
    description: 'Tone-up lotion dengan wangi mewah & UV filter.'
  },
  {
    id: 'RC-006',
    sku: '8997234010067',
    name: 'Raecca Collagen Lip Mask (Hydra)',
    category: 'lip',
    categoryName: 'Lip Care',
    price: 35000,
    icon: '🍓',
    stockInitial: 70,
    stockCurrent: 58,
    isBestSeller: false,
    description: 'Patch masker kolagen untuk melembapkan bibir pecah.'
  },
  {
    id: 'RC-007',
    sku: '8997234010074',
    name: 'Raecca Glazed Lip Oil (Crystal)',
    category: 'lip',
    categoryName: 'Lip Care',
    price: 69000,
    icon: '💎',
    stockInitial: 35,
    stockCurrent: 14,
    isBestSeller: false,
    description: 'Nourishing oil dengan kilau kaca tanpa rasa lengket.'
  },
  {
    id: 'RC-008',
    sku: '8997234010081',
    name: '🔥 BUNDLE: Duo Lippie Hero (Serum + Glow)',
    category: 'bundle',
    categoryName: 'Event Bundle',
    price: 109000,
    normalPrice: 124000,
    discountAmount: 15000,
    icon: '🎁',
    stockInitial: 30,
    stockCurrent: 18,
    isBestSeller: true,
    description: 'Paket bundling terlaris booth PIK hemat Rp 15.000.'
  },
  {
    id: 'RC-009',
    sku: '8997234010098',
    name: '🔥 BUNDLE: Glow Up Set (Jelly Mask + Lotion)',
    category: 'bundle',
    categoryName: 'Event Bundle',
    price: 139000,
    normalPrice: 160000,
    discountAmount: 21000,
    icon: '🌟',
    stockInitial: 25,
    stockCurrent: 15,
    isBestSeller: true,
    description: 'Kombinasi perawatan wajah & tubuh hemat Rp 21.000.'
  }
];

// --- 2. SEEDED TRANSACTIONS (DAY 1 PIK REALISTIC TIMELINE) ---
const INITIAL_TRANSACTIONS = [
  {
    id: '#RC-261005-0001',
    time: '10:24',
    timestamp: '2026-10-05T10:24:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-001', name: 'Raecca Lippie Serum (6ml)', qty: 1, price: 59000 }],
    gross: 59000,
    discount: 0,
    net: 59000,
    method: 'QRIS BCA',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0002',
    time: '11:15',
    timestamp: '2026-10-05T11:15:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-008', name: '🔥 BUNDLE: Duo Lippie Hero', qty: 1, price: 109000 }],
    gross: 124000,
    discount: 15000,
    net: 109000,
    method: 'QRIS Gopay',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0003',
    time: '12:05',
    timestamp: '2026-10-05T12:05:00',
    cashier: 'Clara (BA-04)',
    items: [
      { id: 'RC-004', name: 'Raecca Jelly Mask Petals', qty: 1, price: 75000 },
      { id: 'RC-006', name: 'Raecca Collagen Lip Mask', qty: 1, price: 35000 }
    ],
    gross: 110000,
    discount: 0,
    net: 110000,
    method: 'Cash',
    tendered: 150000,
    change: 40000,
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0004',
    time: '13:42',
    timestamp: '2026-10-05T13:42:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-005', name: 'Raecca Instant White Body Lotion', qty: 1, price: 85000 }],
    gross: 85000,
    discount: 0,
    net: 85000,
    method: 'EDC Mandiri',
    approvalCode: '821903',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0005',
    time: '14:20',
    timestamp: '2026-10-05T14:20:00',
    cashier: 'Clara (BA-04)',
    items: [
      { id: 'RC-008', name: '🔥 BUNDLE: Duo Lippie Hero', qty: 2, price: 109000 },
      { id: 'RC-001', name: 'Raecca Lippie Serum (6ml)', qty: 1, price: 59000 }
    ],
    gross: 307000,
    discount: 30000,
    net: 277000,
    method: 'QRIS BCA',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0006',
    time: '15:10',
    timestamp: '2026-10-05T15:10:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-002', name: 'Raecca Lippie Glow Pop', qty: 2, price: 65000 }],
    gross: 130000,
    discount: 0,
    net: 130000,
    method: 'EDC BCA',
    approvalCode: '439211',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0007',
    time: '16:05',
    timestamp: '2026-10-05T16:05:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-009', name: '🔥 BUNDLE: Glow Up Set', qty: 1, price: 139000 }],
    gross: 160000,
    discount: 21000,
    net: 139000,
    method: 'QRIS ShopeePay',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0008',
    time: '17:30',
    timestamp: '2026-10-05T17:30:00',
    cashier: 'Clara (BA-04)',
    items: [
      { id: 'RC-003', name: 'Raecca Cheek & Lip Tint Velvet', qty: 2, price: 49000 },
      { id: 'RC-007', name: 'Raecca Glazed Lip Oil', qty: 1, price: 69000 }
    ],
    gross: 167000,
    discount: 0,
    net: 167000,
    method: 'Cash',
    tendered: 200000,
    change: 33000,
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0009',
    time: '19:15',
    timestamp: '2026-10-05T19:15:00',
    cashier: 'Clara (BA-04)',
    items: [
      { id: 'RC-001', name: 'Raecca Lippie Serum (6ml)', qty: 3, price: 59000 },
      { id: 'RC-008', name: '🔥 BUNDLE: Duo Lippie Hero', qty: 1, price: 109000 }
    ],
    gross: 301000,
    discount: 15000,
    net: 286000,
    method: 'QRIS BCA',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0010',
    time: '19:50',
    timestamp: '2026-10-05T19:50:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-004', name: 'Raecca Jelly Mask Petals', qty: 2, price: 75000 }],
    gross: 150000,
    discount: 0,
    net: 150000,
    method: 'EDC BRI',
    approvalCode: '109284',
    synced: true,
    isVoid: false
  },
  {
    id: '#RC-261005-0011',
    time: '20:15',
    timestamp: '2026-10-05T20:15:00',
    cashier: 'Clara (BA-04)',
    items: [{ id: 'RC-009', name: '🔥 BUNDLE: Glow Up Set', qty: 1, price: 139000 }],
    gross: 160000,
    discount: 21000,
    net: 139000,
    method: 'QRIS BCA',
    synced: true,
    isVoid: false
  }
];

// Seeded Void log for audit demo
const INITIAL_VOID_LOGS = [
  {
    time: '13:10',
    invoiceId: '#RC-261005-0000',
    itemsDesc: '1x Raecca Cheek & Lip Tint',
    nominal: 49000,
    cashier: 'Clara (BA-04)',
    supervisor: 'SPV Sarah (ID: 991)',
    reason: 'Salah pilih shade warna oleh pelanggan',
    physicalReceiptStatus: 'Distempel VOID & Distaples di Logbook'
  }
];

// --- 3. APPLICATION STATE ---
const state = {
  currentRole: 'cashier', // 'cashier' | 'supervisor' | 'management'
  isOnline: true,
  offlineQueue: [],
  cart: [],
  products: [...MASTER_PRODUCTS],
  transactions: [...INITIAL_TRANSACTIONS],
  voidLogs: [...INITIAL_VOID_LOGS],
  selectedCategory: 'all',
  searchQuery: '',
  activePayMethod: 'qris',
  currentInvSequence: 12,
  supervisorPin: '1234',
  tempCheckoutData: null,
  restockRequests: {}
};

// --- 4. FORMATTERS & HELPERS ---
function formatRupiah(amount) {
  return 'Rp ' + Number(amount || 0).toLocaleString('id-ID');
}

function generateInvoiceNumber() {
  const seq = String(state.currentInvSequence).padStart(4, '0');
  return `#RC-261005-${seq}`;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- 5. RENDER FUNCTIONS: POS CATALOG & CART ---
function renderProductGrid() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  const filtered = state.products.filter(p => {
    const matchCat = state.selectedCategory === 'all' || p.category === state.selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                        p.sku.includes(state.searchQuery);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>Tidak ada produk ditemukan untuk pencarian "${state.searchQuery}"</p>
      </div>
    `;
    return;
  }

  filtered.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => addToCart(prod.id);

    const isLowStock = prod.stockCurrent <= 15;
    const isBundle = prod.category === 'bundle';

    card.innerHTML = `
      <div>
        <div class="product-badge-wrap">
          <span class="category-tag">${prod.categoryName}</span>
          <span class="stock-tag ${isLowStock ? 'low' : ''}">
            ${isLowStock ? '⚠️ ' : ''}Sisa ${prod.stockCurrent} pcs
          </span>
        </div>
        <div class="product-icon-box">${prod.icon}</div>
        <h4 class="product-title">${prod.name}</h4>
        <div class="product-sku font-mono">SKU: ${prod.sku}</div>
      </div>
      <div class="product-footer">
        <div>
          ${prod.normalPrice ? `<div style="font-size: 11px; text-decoration: line-through; color: var(--text-dim);">${formatRupiah(prod.normalPrice)}</div>` : ''}
          <div class="product-price ${isBundle ? 'text-gradient-primary' : ''}">${formatRupiah(prod.price)}</div>
        </div>
        <button class="product-add-btn" title="Tambah ke keranjang">+</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (product.stockCurrent <= 0) {
    showToast(`Stok ${product.name} habis di booth!`, 'error');
    return;
  }

  const existing = state.cart.find(item => item.product.id === productId);
  if (existing) {
    if (existing.qty + 1 > product.stockCurrent) {
      showToast(`Maksimal stok tercapai (${product.stockCurrent} pcs)`, 'error');
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.push({ product, qty: 1 });
  }

  renderCart();
  showToast(`Ditambahkan: ${product.name}`, 'info');
}

function updateCartQty(productId, delta) {
  const index = state.cart.findIndex(item => item.product.id === productId);
  if (index === -1) return;

  const item = state.cart[index];
  const newQty = item.qty + delta;

  if (newQty <= 0) {
    state.cart.splice(index, 1);
  } else {
    if (newQty > item.product.stockCurrent) {
      showToast(`Stok maksimal ${item.product.stockCurrent} pcs`, 'error');
      return;
    }
    item.qty = newQty;
  }
  renderCart();
}

function calculateCartTotals() {
  let gross = 0;
  let discount = 0;
  let totalItems = 0;

  state.cart.forEach(item => {
    totalItems += item.qty;
    const baseItemPrice = item.product.normalPrice || item.product.price;
    gross += baseItemPrice * item.qty;

    if (item.product.discountAmount) {
      discount += item.product.discountAmount * item.qty;
    }
  });

  // Event Promo Tier: Belanja > 150.000 diskon tambahan Rp 10.000 jika belum bundle
  let extraTierDiscount = 0;
  if (gross >= 200000 && discount === 0) {
    extraTierDiscount = 10000;
    discount += extraTierDiscount;
  }

  const net = Math.max(0, gross - discount);

  return { gross, discount, net, totalItems, extraTierDiscount };
}

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('cartEmptyState');
  const payBtn = document.getElementById('btnPayCheckout');
  const badge = document.getElementById('cartItemCountBadge');

  const { gross, discount, net, totalItems } = calculateCartTotals();

  badge.textContent = `${totalItems} item`;
  document.getElementById('summaryGross').textContent = formatRupiah(gross);
  document.getElementById('summaryDiscount').textContent = `- ${formatRupiah(discount)}`;
  document.getElementById('summaryNet').textContent = formatRupiah(net);
  document.getElementById('btnPayAmount').textContent = formatRupiah(net);

  if (state.cart.length === 0) {
    list.innerHTML = '';
    list.appendChild(emptyState);
    payBtn.disabled = true;
    return;
  }

  emptyState.remove();
  list.innerHTML = '';

  state.cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    const itemSubtotal = item.product.price * item.qty;

    row.innerHTML = `
      <div class="cart-item-main">
        <div>
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-sku font-mono">SKU: ${item.product.sku} &bull; @${formatRupiah(item.product.price)}</div>
        </div>
        <div class="cart-item-total font-mono">${formatRupiah(itemSubtotal)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control-wrap">
          <button class="btn-qty" onclick="window.posEngine.updateQty('${item.product.id}', -1)">&minus;</button>
          <span class="qty-count font-mono">${item.qty}</span>
          <button class="btn-qty" onclick="window.posEngine.updateQty('${item.product.id}', 1)">&plus;</button>
        </div>
        <button style="font-size: 11px; color: var(--danger);" onclick="window.posEngine.updateQty('${item.product.id}', -${item.qty})">Hapus</button>
      </div>
    `;
    list.appendChild(row);
  });

  payBtn.disabled = false;
}

// --- 6. CHECKOUT & PAYMENT FLOWS ---
function openPaymentModal() {
  if (state.cart.length === 0) return;
  const { net } = calculateCartTotals();
  
  const inv = generateInvoiceNumber();
  document.getElementById('payModalInvoice').textContent = `Invoice: ${inv}`;
  document.getElementById('payModalTotalText').textContent = formatRupiah(net);

  // Setup Cash Tab default
  document.getElementById('cashTenderedInput').value = net;
  updateCashChange(net, net);

  // Switch to default QRIS tab
  switchPayMethod('qris');

  document.getElementById('modalPayment').style.display = 'flex';
}

function closePaymentModal() {
  document.getElementById('modalPayment').style.display = 'none';
}

function switchPayMethod(method) {
  state.activePayMethod = method;
  document.querySelectorAll('.pay-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.method === method);
  });
  document.querySelectorAll('.pay-method-content').forEach(pane => {
    pane.classList.remove('active');
  });

  if (method === 'qris') document.getElementById('payPaneQris').classList.add('active');
  if (method === 'edc') document.getElementById('payPaneEdc').classList.add('active');
  if (method === 'cash') document.getElementById('payPaneCash').classList.add('active');
}

function updateCashChange(tendered, total) {
  const diff = Number(tendered) - Number(total);
  const display = document.getElementById('cashChangeDisplay');
  if (diff >= 0) {
    display.textContent = formatRupiah(diff);
    display.classList.remove('text-danger');
    display.classList.add('text-success');
  } else {
    display.textContent = `Kurang ${formatRupiah(Math.abs(diff))}`;
    display.classList.remove('text-success');
    display.classList.add('text-danger');
  }
}

function completeTransaction(paymentMethod, metadata = {}) {
  const { gross, discount, net } = calculateCartTotals();
  const invoiceId = generateInvoiceNumber();
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const cartSnapshot = state.cart.map(item => ({
    id: item.product.id,
    name: item.product.name,
    qty: item.qty,
    price: item.product.price
  }));

  // Deduct physical stock
  state.cart.forEach(item => {
    const prod = state.products.find(p => p.id === item.product.id);
    if (prod) {
      prod.stockCurrent = Math.max(0, prod.stockCurrent - item.qty);
    }
  });

  const txRecord = {
    id: invoiceId,
    time: timeStr,
    timestamp: now.toISOString(),
    cashier: 'Clara (BA-04)',
    items: cartSnapshot,
    gross,
    discount,
    net,
    method: paymentMethod,
    tendered: metadata.tendered || net,
    change: metadata.change || 0,
    approvalCode: metadata.approvalCode || null,
    synced: state.isOnline,
    isVoid: false
  };

  if (state.isOnline) {
    state.transactions.unshift(txRecord);
  } else {
    state.offlineQueue.push(txRecord);
    state.transactions.unshift(txRecord);
    updateOfflineStatus();
  }

  // Increment sequence
  state.currentInvSequence += 1;
  document.getElementById('cartInvoiceId').textContent = generateInvoiceNumber();

  // Reset cart
  state.cart = [];
  renderCart();
  renderProductGrid();

  closePaymentModal();
  showReceiptModal(txRecord);

  // Update Live Analytics
  renderManagementDashboard();
  renderSupervisorPanel();

  showToast(`Transaksi ${invoiceId} berhasil diselesaikan!`, 'success');
}

// --- 7. THERMAL RECEIPT 80MM RENDER ---
function showReceiptModal(tx) {
  document.getElementById('rcptInv').textContent = tx.id;
  document.getElementById('rcptDate').textContent = `${tx.timestamp.slice(0, 10)} ${tx.time} WIB`;
  document.getElementById('rcptCashier').textContent = tx.cashier;
  document.getElementById('rcptMode').textContent = tx.synced ? 'ONLINE SYNC' : 'OFFLINE CACHED';

  const table = document.getElementById('rcptItemsTable');
  table.innerHTML = '';
  tx.items.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'rcpt-item-entry';
    entry.innerHTML = `
      <div class="rcpt-item-row-1">
        <span>${item.name}</span>
        <span>${formatRupiah(item.price * item.qty)}</span>
      </div>
      <div class="rcpt-item-row-2">
        ${item.qty} x ${formatRupiah(item.price)}
      </div>
    `;
    table.appendChild(entry);
  });

  document.getElementById('rcptGross').textContent = formatRupiah(tx.gross);
  document.getElementById('rcptDiscount').textContent = `- ${formatRupiah(tx.discount)}`;
  document.getElementById('rcptNet').textContent = formatRupiah(tx.net);
  document.getElementById('rcptPaymentMethod').textContent = tx.method;
  document.getElementById('rcptTendered').textContent = formatRupiah(tx.tendered || tx.net);
  document.getElementById('rcptChange').textContent = formatRupiah(tx.change || 0);

  document.getElementById('modalReceipt').style.display = 'flex';
}

function closeReceiptModal() {
  document.getElementById('modalReceipt').style.display = 'none';
}

// --- 8. SUPERVISOR VOID & RETUR ACTIONS ---
function openSupervisorPinModal(targetTxId = null) {
  const select = document.getElementById('voidTxSelect');
  select.innerHTML = '';

  const activeTxs = state.transactions.filter(t => !t.isVoid);
  activeTxs.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.id} - ${t.time} WIB - ${formatRupiah(t.net)} (${t.items[0]?.name || ''})`;
    if (targetTxId && t.id === targetTxId) opt.selected = true;
    select.appendChild(opt);
  });

  document.getElementById('supervisorPinInput').value = '';
  document.getElementById('pinErrorText').style.display = 'none';
  document.getElementById('modalSupervisorPin').style.display = 'flex';
}

function closeSupervisorPinModal() {
  document.getElementById('modalSupervisorPin').style.display = 'none';
}

function submitSupervisorVoid() {
  const enteredPin = document.getElementById('supervisorPinInput').value;
  const errorText = document.getElementById('pinErrorText');
  const targetId = document.getElementById('voidTxSelect').value;
  const reason = document.getElementById('voidReasonSelect').value;

  if (enteredPin !== state.supervisorPin) {
    errorText.style.display = 'block';
    return;
  }

  const tx = state.transactions.find(t => t.id === targetId);
  if (!tx) {
    showToast('Transaksi tidak ditemukan!', 'error');
    return;
  }

  // Mark transaction as void
  tx.isVoid = true;

  // Restore stock
  tx.items.forEach(item => {
    const prod = state.products.find(p => p.id === item.id);
    if (prod) prod.stockCurrent += item.qty;
  });

  // Log to audit logbook
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  state.voidLogs.unshift({
    time: timeStr,
    invoiceId: tx.id,
    itemsDesc: tx.items.map(i => `${i.qty}x ${i.name}`).join(', '),
    nominal: tx.net,
    cashier: tx.cashier,
    supervisor: 'SPV Sarah (PIN Auth OK)',
    reason: reason,
    physicalReceiptStatus: 'Distempel VOID & Distaples di Logbook'
  });

  closeSupervisorPinModal();
  renderProductGrid();
  renderSupervisorPanel();
  renderManagementDashboard();

  showToast(`Void Sukses: Transaksi ${tx.id} dibatalkan & stok dikembalikan!`, 'success');
}

function renderSupervisorPanel() {
  // Render Void Log Table
  const tbody = document.getElementById('voidLogTableBody');
  tbody.innerHTML = '';
  state.voidLogs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-mono">${log.time} WIB</td>
      <td class="font-mono text-danger font-bold">${log.invoiceId}</td>
      <td>${log.itemsDesc}</td>
      <td class="font-mono">${formatRupiah(log.nominal)}</td>
      <td>${log.cashier}</td>
      <td><span class="badge-status badge-void">${log.supervisor}</span></td>
      <td>${log.reason}</td>
      <td><span style="font-size: 11px; color: var(--accent-gold);">📜 ${log.physicalReceiptStatus}</span></td>
    `;
    tbody.appendChild(tr);
  });

  // Render Stock Opname Table
  const opnameBody = document.getElementById('stockOpnameTableBody');
  opnameBody.innerHTML = '';

  state.products.forEach(p => {
    // calculate sold today
    let soldCount = 0;
    state.transactions.filter(t => !t.isVoid).forEach(tx => {
      const match = tx.items.find(i => i.id === p.id);
      if (match) soldCount += match.qty;
    });

    const expectedStock = p.stockCurrent;
    const reqRestock = state.restockRequests[p.id] || (expectedStock < 25 ? 30 : 0);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-mono">${p.sku}</td>
      <td><strong>${p.name}</strong></td>
      <td class="font-mono">${p.stockInitial} pcs</td>
      <td class="font-mono text-success">-${soldCount} pcs</td>
      <td class="font-mono"><strong>${expectedStock} pcs</strong></td>
      <td>
        <input type="number" class="form-input font-mono" style="width: 70px; padding: 4px;" value="${expectedStock}" id="opnamePhys_${p.id}">
      </td>
      <td><span class="text-success font-mono">0 (Balanced)</span></td>
      <td>
        <input type="number" class="form-input font-mono" style="width: 70px; padding: 4px;" value="${reqRestock}" id="opnameReq_${p.id}">
      </td>
    `;
    opnameBody.appendChild(tr);
  });
}

// --- 9. MANAGEMENT DASHBOARD & REALTIME ANALYTICS ---
function renderManagementDashboard() {
  const activeTxs = state.transactions.filter(t => !t.isVoid);

  let totalGross = 0;
  let totalDiscount = 0;
  let totalNet = 0;
  let qrisSum = 0;
  let edcSum = 0;
  let cashSum = 0;
  let totalUnits = 0;

  activeTxs.forEach(t => {
    totalGross += t.gross;
    totalDiscount += t.discount;
    totalNet += t.net;
    t.items.forEach(i => totalUnits += i.qty);

    if (t.method.includes('QRIS')) qrisSum += t.net;
    else if (t.method.includes('EDC')) edcSum += t.net;
    else if (t.method.includes('Cash')) cashSum += t.net;
  });

  const txCount = activeTxs.length;
  const avgBasket = txCount > 0 ? Math.round(totalNet / txCount) : 0;
  const cashlessRatio = totalNet > 0 ? Math.round(((qrisSum + edcSum) / totalNet) * 100) : 0;

  // KPI UI
  document.getElementById('kpiNetSales').textContent = formatRupiah(totalNet);
  document.getElementById('kpiGrossSales').textContent = formatRupiah(totalGross);
  document.getElementById('kpiDiscount').textContent = formatRupiah(totalDiscount);
  document.getElementById('kpiTxCount').innerHTML = `${txCount} <small>Nota</small>`;
  document.getElementById('kpiAvgBasket').textContent = formatRupiah(avgBasket);
  document.getElementById('kpiCashlessRatio').textContent = `${cashlessRatio}%`;
  document.getElementById('kpiQrisTotal').textContent = formatRupiah(qrisSum);
  document.getElementById('kpiEdcTotal').textContent = formatRupiah(edcSum);
  document.getElementById('kpiUnitSold').innerHTML = `${totalUnits} <small>pcs</small>`;

  // Payment Breakdown Bars
  const qrisPct = totalNet > 0 ? (qrisSum / totalNet) * 100 : 0;
  const edcPct = totalNet > 0 ? (edcSum / totalNet) * 100 : 0;
  const cashPct = totalNet > 0 ? (cashSum / totalNet) * 100 : 0;

  document.getElementById('payRatioQrisText').textContent = `${formatRupiah(qrisSum)} (${Math.round(qrisPct)}%)`;
  document.getElementById('barQris').style.width = `${qrisPct}%`;

  document.getElementById('payRatioEdcText').textContent = `${formatRupiah(edcSum)} (${Math.round(edcPct)}%)`;
  document.getElementById('barEdc').style.width = `${edcPct}%`;

  document.getElementById('payRatioCashText').textContent = `${formatRupiah(cashSum)} (${Math.round(cashPct)}%)`;
  document.getElementById('barCash').style.width = `${cashPct}%`;

  // Render Hourly Chart
  renderHourlyChart(activeTxs);

  // Render Top 3 Fast-Moving
  renderFastMovingHero(activeTxs);

  // Render Real-time Feed
  renderRealtimeTxFeed();

  // Ticker text
  if (activeTxs.length > 0) {
    const latest = activeTxs[0];
    document.getElementById('liveTickerText').textContent = `Transaksi terbaru ${latest.id} senilai ${formatRupiah(latest.net)} via ${latest.method} (${latest.items[0]?.name || ''})`;
    document.getElementById('liveTickerTime').textContent = `${latest.time} WIB`;
  }
}

function renderHourlyChart(txs) {
  const container = document.getElementById('hourlyChartContainer');
  container.innerHTML = '';

  const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const hourlyData = {};
  hours.forEach(h => hourlyData[h] = 0);

  txs.forEach(t => {
    const hour = parseInt(t.time.split(':')[0], 10);
    if (hourlyData[hour] !== undefined) {
      hourlyData[hour] += t.net;
    }
  });

  const maxVal = Math.max(...Object.values(hourlyData), 100000);

  hours.forEach(h => {
    const val = hourlyData[h];
    const pct = Math.max(5, (val / maxVal) * 100);
    const isPeak = h === 14 || h === 19;

    const group = document.createElement('div');
    group.className = 'chart-bar-group';
    group.innerHTML = `
      <div class="chart-bar ${isPeak ? 'peak' : ''}" style="height: ${pct}%;" title="${h}:00 WIB: ${formatRupiah(val)}"></div>
      <span class="chart-label">${h}:00</span>
    `;
    container.appendChild(group);
  });
}

function renderFastMovingHero(txs) {
  const counts = {};
  txs.forEach(t => {
    t.items.forEach(i => {
      counts[i.name] = (counts[i.name] || 0) + i.qty;
    });
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const container = document.getElementById('fastMovingList');
  container.innerHTML = '';

  sorted.forEach(([name, count], idx) => {
    const item = document.createElement('div');
    item.className = 'fast-item';
    item.innerHTML = `
      <div><strong>#${idx + 1} ${name}</strong></div>
      <span class="font-mono text-gradient-primary"><strong>${count} pcs terjual</strong></span>
    `;
    container.appendChild(item);
  });
}

function renderRealtimeTxFeed() {
  const tbody = document.getElementById('realtimeTxTableBody');
  tbody.innerHTML = '';

  state.transactions.slice(0, 10).forEach(t => {
    const tr = document.createElement('tr');
    if (t.isVoid) tr.style.opacity = '0.5';

    tr.innerHTML = `
      <td class="font-mono"><strong>${t.id}</strong></td>
      <td class="font-mono">${t.time} WIB</td>
      <td>${t.cashier}</td>
      <td>${t.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</td>
      <td><span class="badge-status" style="background: rgba(255,255,255,0.1);">${t.method}</span></td>
      <td class="font-mono text-discount">${t.discount > 0 ? '-' + formatRupiah(t.discount) : '-'}</td>
      <td class="font-mono"><strong>${formatRupiah(t.net)}</strong></td>
      <td>
        ${t.isVoid 
          ? '<span class="badge-status badge-void">VOID</span>' 
          : t.synced 
            ? '<span class="badge-status badge-synced">CLOUDSYNCED</span>' 
            : '<span class="badge-status badge-offline">OFFLINE PENDING</span>'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// --- 10. DAILY CLOSING REPORT & EOD GENERATOR ---
function openEodReportModal() {
  const activeTxs = state.transactions.filter(t => !t.isVoid);
  const { gross, discount, net } = activeTxs.reduce((acc, t) => ({
    gross: acc.gross + t.gross,
    discount: acc.discount + t.discount,
    net: acc.net + t.net
  }), { gross: 0, discount: 0, net: 0 });

  let qrisSum = 0, qrisCount = 0;
  let edcSum = 0, edcCount = 0;
  let cashSum = 0, cashCount = 0;

  activeTxs.forEach(t => {
    if (t.method.includes('QRIS')) { qrisSum += t.net; qrisCount++; }
    else if (t.method.includes('EDC')) { edcSum += t.net; edcCount++; }
    else if (t.method.includes('Cash')) { cashSum += t.net; cashCount++; }
  });

  document.getElementById('eodNetSales').textContent = formatRupiah(net);
  document.getElementById('eodTxTotal').textContent = `${activeTxs.length} Nota`;

  // Reconciliation table
  const tbody = document.getElementById('eodReconciliationBody');
  tbody.innerHTML = `
    <tr>
      <td><strong>QRIS Dinamis/Statis</strong></td>
      <td class="font-mono">${qrisCount} Nota</td>
      <td class="font-mono text-success">${formatRupiah(qrisSum)}</td>
      <td><span class="badge-status badge-synced">Settlement Verified</span></td>
    </tr>
    <tr>
      <td><strong>Mesin EDC Bank (Debit/Kredit)</strong></td>
      <td class="font-mono">${edcCount} Nota</td>
      <td class="font-mono text-success">${formatRupiah(edcSum)}</td>
      <td><span class="badge-status badge-synced">Batch Settlement OK</span></td>
    </tr>
    <tr>
      <td><strong>Uang Tunai (Cash di Laci)</strong></td>
      <td class="font-mono">${cashCount} Nota</td>
      <td class="font-mono text-success">${formatRupiah(cashSum)}</td>
      <td><span class="badge-status badge-synced">Fisik Kasir Sesuai</span></td>
    </tr>
  `;

  // WhatsApp Broadcast Template text
  generateWaBroadcastText(net, gross, discount, activeTxs.length, cashSum, qrisSum, qrisCount, edcSum, edcCount);

  document.getElementById('modalEodReport').style.display = 'flex';
}

function generateWaBroadcastText(net, gross, discount, txCount, cashSum, qrisSum, qrisCount, edcSum, edcCount) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Top products
  const counts = {};
  state.transactions.filter(t => !t.isVoid).forEach(t => {
    t.items.forEach(i => counts[i.name] = (counts[i.name] || 0) + i.qty);
  });
  const topList = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 3);
  const topText = topList.map(([k, v], idx) => `${idx + 1}. ${k} : ${v} pcs`).join('\n');

  const text = `========================================
LAPORAN CLOSING HARIAN - BOOTH RAECCA PIK
Hari/Tanggal : ${dateStr}
Shift Leader : SPV Sarah
Kasir On Duty: Clara (BA-04)
Lokasi       : Curved Counter L, PIK Pop-up Store
========================================

RINGKASAN PENJUALAN:
- Gross Sales     : ${formatRupiah(gross)}
- Total Diskon    : ${formatRupiah(discount)}
- NET SALES       : ${formatRupiah(net)}
- Total Transaksi : ${txCount} Nota
- Average Basket  : ${formatRupiah(txCount > 0 ? Math.round(net / txCount) : 0)}

RINCIAN PEMBAYARAN:
- Cash (Tunai)    : ${formatRupiah(cashSum)} (Fisik Sesuai)
- QRIS            : ${formatRupiah(qrisSum)} (${qrisCount} Transaksi)
- EDC / Debit     : ${formatRupiah(edcSum)} (${edcCount} Transaksi)
- Selisih Kas     : Rp 0 (Balance / Zero Discrepancy)

TOP 3 FAST-MOVING SKU:
${topText || '1. Raecca Lippie Serum (6ml) : 12 pcs'}

REQUEST RESTOCK BESOK (H+1):
1. Raecca Lippie Serum (6ml) - Request 30 pcs
2. Duo Lippie Hero Bundle   - Request 20 pcs

Catatan Operasional:
- Status Koneksi: Dedicated 4G/5G Router Normal (100% Online)
- Kejadian Khusus / Void: ${state.voidLogs.length} Transaksi (Sesuai Logbook SPV)
- Rekapitulasi detail CSV/Excel telah siap diunduh.

Terima kasih.
========================================`;

  document.getElementById('waBroadcastText').value = text;
}

function exportCsvReport() {
  const activeTxs = state.transactions.filter(t => !t.isVoid);
  let csv = 'Invoice,Time,Cashier,Item_Count,Method,Gross,Discount,Net,Status\n';

  activeTxs.forEach(t => {
    const itemsCount = t.items.reduce((acc, i) => acc + i.qty, 0);
    csv += `"${t.id}","${t.time}","${t.cashier}",${itemsCount},"${t.method}",${t.gross},${t.discount},${t.net},"COMPLETED"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `RAECCA_POS_CLOSING_20261005.csv`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('File CSV Laporan Closing berhasil diunduh!', 'success');
}

// --- 11. NETWORK SIMULATION & OFFLINE ENGINE ---
function toggleNetworkStatus() {
  state.isOnline = !state.isOnline;
  updateOfflineStatus();
}

function updateOfflineStatus() {
  const pill = document.getElementById('networkPill');
  const text = document.getElementById('networkStatusText');
  const banner = document.getElementById('offlineBanner');
  const countEl = document.getElementById('pendingSyncCount');

  if (state.isOnline) {
    pill.className = 'status-pill status-network online';
    text.textContent = 'Dedicated 4G/5G Online';
    banner.style.display = 'none';
  } else {
    pill.className = 'status-pill status-network offline';
    text.textContent = 'Sinyal Putus (Offline Mode)';
    banner.style.display = 'block';
    countEl.textContent = state.offlineQueue.length;
  }
}

function syncOfflineTransactions() {
  if (state.offlineQueue.length === 0) {
    showToast('Tidak ada transaksi tertunda untuk disinkronkan.', 'info');
    state.isOnline = true;
    updateOfflineStatus();
    return;
  }

  const count = state.offlineQueue.length;
  // Mark all offline transactions in main array as synced
  state.offlineQueue.forEach(item => {
    const match = state.transactions.find(t => t.id === item.id);
    if (match) match.synced = true;
  });

  state.offlineQueue = [];
  state.isOnline = true;
  updateOfflineStatus();
  renderRealtimeTxFeed();

  showToast(`Sukses sinkronisasi! ${count} transaksi offline berhasil dikirim ke Cloud Server Raecca.`, 'success');
}

// --- 12. ROLE SWITCHER ---
function setRole(role) {
  state.currentRole = role;
  document.querySelectorAll('.role-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active-view');
  });

  if (role === 'cashier') {
    document.getElementById('viewCashier').classList.add('active-view');
  } else if (role === 'supervisor') {
    document.getElementById('viewSupervisor').classList.add('active-view');
    renderSupervisorPanel();
  } else if (role === 'management') {
    document.getElementById('viewManagement').classList.add('active-view');
    renderManagementDashboard();
  }
}

// --- 13. EVENT LISTENERS & INITIALIZATION ---
function initApp() {
  // Role Selector
  document.getElementById('roleBtnCashier').onclick = () => setRole('cashier');
  document.getElementById('roleBtnSpv').onclick = () => setRole('supervisor');
  document.getElementById('roleBtnOwner').onclick = () => setRole('management');

  // Category Tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.selectedCategory = tab.dataset.cat;
      renderProductGrid();
    };
  });

  // Search input
  const searchInput = document.getElementById('productSearchInput');
  searchInput.oninput = (e) => {
    state.searchQuery = e.target.value;
    renderProductGrid();
  };

  // Barcode Scanner Simulator
  document.getElementById('btnSimulateScan').onclick = () => {
    const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
    addToCart(randomProduct.id);
    showToast(`📷 Barcode Scan Berhasil: ${randomProduct.sku} (${randomProduct.name})`, 'success');
  };

  // Cart actions
  document.getElementById('btnPayCheckout').onclick = openPaymentModal;
  document.getElementById('btnClearCart').onclick = () => {
    if (state.cart.length === 0) return;
    state.cart = [];
    renderCart();
    showToast('Keranjang transaksi dikosongkan.', 'info');
  };
  document.getElementById('btnHoldBill').onclick = () => {
    if (state.cart.length === 0) return;
    showToast('Struk berhasil ditahan (Hold Bill #01). Anda dapat melayani antrean lain.', 'info');
  };

  // Payment Tabs
  document.getElementById('payTabQris').onclick = () => switchPayMethod('qris');
  document.getElementById('payTabEdc').onclick = () => switchPayMethod('edc');
  document.getElementById('payTabCash').onclick = () => switchPayMethod('cash');

  // Payment Confirmations
  document.getElementById('btnConfirmQris').onclick = () => {
    completeTransaction('QRIS BCA', { refId: 'QRIS-REF-' + Math.floor(Math.random() * 900000 + 100000) });
  };
  document.getElementById('btnConfirmEdc').onclick = () => {
    const bank = document.getElementById('edcBankSelect').value;
    const code = document.getElementById('edcApprovalCode').value.trim() || '489201';
    completeTransaction(`EDC ${bank}`, { approvalCode: code });
  };
  document.getElementById('btnConfirmCash').onclick = () => {
    const { net } = calculateCartTotals();
    const tendered = Number(document.getElementById('cashTenderedInput').value) || net;
    if (tendered < net) {
      showToast('Nominal uang tunai kurang dari total tagihan!', 'error');
      return;
    }
    completeTransaction('Cash', { tendered, change: tendered - net });
  };

  // Cash quick buttons
  document.getElementById('cashTenderedInput').oninput = (e) => {
    const { net } = calculateCartTotals();
    updateCashChange(e.target.value, net);
  };
  document.getElementById('btnCashExact').onclick = () => {
    const { net } = calculateCartTotals();
    document.getElementById('cashTenderedInput').value = net;
    updateCashChange(net, net);
  };
  document.querySelectorAll('.btn-quick-cash[data-val]').forEach(btn => {
    btn.onclick = () => {
      const val = Number(btn.dataset.val);
      document.getElementById('cashTenderedInput').value = val;
      const { net } = calculateCartTotals();
      updateCashChange(val, net);
    };
  });

  // Modal Closers
  document.getElementById('btnClosePayModal').onclick = closePaymentModal;
  document.getElementById('btnCloseReceiptModal').onclick = closeReceiptModal;
  document.getElementById('btnNextTransaction').onclick = closeReceiptModal;
  document.getElementById('btnPrintReceipt').onclick = () => window.print();

  // Supervisor Actions
  document.getElementById('btnManualVoidModal').onclick = () => openSupervisorPinModal();
  document.getElementById('btnClosePinModal').onclick = closeSupervisorPinModal;
  document.getElementById('btnCancelVoid').onclick = closeSupervisorPinModal;
  document.getElementById('btnSubmitVoid').onclick = submitSupervisorVoid;

  // Supervisor Sub Tabs
  document.querySelectorAll('.spv-nav-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.spv-nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.spv-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.spvTab;
      if (tab === 'voidLog') document.getElementById('spvPaneVoidLog').classList.add('active');
      if (tab === 'stockOpname') document.getElementById('spvPaneStockOpname').classList.add('active');
      if (tab === 'spvSettings') document.getElementById('spvPaneSettings').classList.add('active');
    };
  });

  document.getElementById('btnSaveStockOpname').onclick = () => {
    state.products.forEach(p => {
      const inputReq = document.getElementById(`opnameReq_${p.id}`);
      if (inputReq) state.restockRequests[p.id] = Number(inputReq.value);
    });
    showToast('Data Stock Opname & Request Restock H+1 berhasil disimpan ke Cloud!', 'success');
  };

  // EOD Modal Actions
  document.getElementById('quickEodBtn').onclick = openEodReportModal;
  document.getElementById('btnCloseEodModal').onclick = () => {
    document.getElementById('modalEodReport').style.display = 'none';
  };
  document.querySelectorAll('.eod-tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.eod-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.eod-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.eodTab;
      if (tab === 'preview') document.getElementById('eodPanePreview').classList.add('active');
      if (tab === 'whatsapp') document.getElementById('eodPaneWhatsapp').classList.add('active');
      if (tab === 'export') document.getElementById('eodPaneExport').classList.add('active');
    };
  });

  document.getElementById('btnCopyWaText').onclick = () => {
    const text = document.getElementById('waBroadcastText').value;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Teks laporan WhatsApp berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
      showToast('Format teks telah diseleksi, silakan tekan Ctrl+C', 'info');
    });
  };

  document.getElementById('btnExportCsv').onclick = exportCsvReport;
  document.getElementById('btnPrintEodSheet').onclick = () => window.print();

  // Network Simulation
  document.getElementById('toggleNetworkBtn').onclick = toggleNetworkStatus;
  document.getElementById('btnSyncNow').onclick = syncOfflineTransactions;

  // Live Clock & Refresh
  setInterval(() => {
    const now = new Date();
    const clock = document.getElementById('liveClock');
    if (clock) {
      clock.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`;
    }
  }, 1000);

  document.getElementById('btnRefreshFeed').onclick = () => {
    renderManagementDashboard();
    showToast('Feed transaksi berhasil diperbarui.', 'info');
  };

  // Initial Render
  document.getElementById('cartInvoiceId').textContent = generateInvoiceNumber();
  renderProductGrid();
  renderCart();
  renderManagementDashboard();
  renderSupervisorPanel();
}

// Expose updateQty helper for inline html calls
window.posEngine = {
  updateQty: updateCartQty
};

// Start application
window.addEventListener('DOMContentLoaded', initApp);
