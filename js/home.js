/* ===== Home Page JS ===== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Category Tabs =====
  var tabButtons = document.querySelectorAll('.tab-button');
  var categoryContents = document.querySelectorAll('.category-content');
  tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      tabButtons.forEach(function(btn) { btn.classList.remove('active'); });
      this.classList.add('active');
      categoryContents.forEach(function(content) { content.classList.remove('active'); });
      var categoryId = this.getAttribute('data-category');
      var target = document.getElementById(categoryId);
      if (target) target.classList.add('active');
    });
  });

  // ===== Product Modal =====
  var modal = document.getElementById('product-modal');
  var modalOverlay = document.getElementById('modal-overlay');
  var closeModalBtn = document.getElementById('close-modal');
  var viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  var decreaseQuantityBtn = document.getElementById('decrease-quantity');
  var increaseQuantityBtn = document.getElementById('increase-quantity');
  var quantityInput = document.getElementById('quantity');

  var products = {
    'orange-juice': {
      title: 'Fresh Orange Juice',
      description: 'Our signature orange juice is made from freshly squeezed, premium oranges. Each glass contains the juice of 4-5 oranges with no added sugar or preservatives. Rich in vitamin C and antioxidants.',
      image: 'img/orange.jpg',
      nutrition: { calories: '120 kcal', protein: '2g', carbs: '26g', sugar: '20g' },
      prices: { small: '$5.99', medium: '$7.49', large: '$8.99' }
    },
    'watermelon-refresher': {
      title: 'Watermelon Refresher',
      description: 'A hydrating blend of fresh watermelon with a hint of mint and lime. Naturally sweet and packed with electrolytes.',
      image: 'img/watermelon.jpg',
      nutrition: { calories: '90 kcal', protein: '1g', carbs: '22g', sugar: '18g' },
      prices: { small: '$6.49', medium: '$7.99', large: '$9.49' }
    },
    'apple-cinnamon': {
      title: 'Apple Cinnamon Juice',
      description: 'Crisp sweetness of fresh apples combined with warm cinnamon. Perfect for any time of year.',
      image: 'img/apple.jpg',
      nutrition: { calories: '110 kcal', protein: '1g', carbs: '28g', sugar: '24g' },
      prices: { small: '$6.99', medium: '$8.49', large: '$9.99' }
    },
    'pineapple-paradise': {
      title: 'Pineapple Paradise',
      description: 'Sweet, tangy, and incredibly refreshing. Rich in bromelain for better digestion.',
      image: 'img/pinapple.jpg',
      nutrition: { calories: '130 kcal', protein: '1g', carbs: '32g', sugar: '26g' },
      prices: { small: '$6.99', medium: '$8.49', large: '$9.99' }
    },
    'pomegranate-power': {
      title: 'Pomegranate Power',
      description: 'Hand-pressed pomegranate arils packed with antioxidants. Slightly tart with a sweet finish.',
      image: 'img/pome.jpg',
      nutrition: { calories: '140 kcal', protein: '1g', carbs: '34g', sugar: '30g' },
      prices: { small: '$7.49', medium: '$8.99', large: '$10.49' }
    },
    'citrus-blast': {
      title: 'Citrus Blast',
      description: 'A vitamin C powerhouse combining orange, grapefruit, and lemon juices.',
      image: 'img/citru.jpg',
      nutrition: { calories: '120 kcal', protein: '2g', carbs: '28g', sugar: '22g' },
      prices: { small: '$6.99', medium: '$8.49', large: '$9.99' }
    },
    'green-detox': {
      title: 'Green Detox',
      description: 'A nutrient-dense blend of kale, spinach, cucumber, celery, and green apple.',
      image: 'img/green.jpg',
      nutrition: { calories: '90 kcal', protein: '3g', carbs: '20g', sugar: '12g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'carrot-ginger': {
      title: 'Carrot Ginger Zinger',
      description: 'Sweet carrots with spicy ginger and a hint of orange. Rich in beta-carotene.',
      image: 'img/carrot,jpg.jpg',
      nutrition: { calories: '100 kcal', protein: '2g', carbs: '24g', sugar: '18g' },
      prices: { small: '$6.99', medium: '$8.49', large: '$9.99' }
    },
    'beetroot-bliss': {
      title: 'Beetroot Bliss',
      description: 'Earthy beetroot with apple and lemon for a perfectly balanced juice.',
      image: 'img/betroot.jpg',
      nutrition: { calories: '110 kcal', protein: '2g', carbs: '26g', sugar: '20g' },
      prices: { small: '$7.49', medium: '$8.99', large: '$10.49' }
    },
    'tomato-refresher': {
      title: 'Tomato Refresher',
      description: 'Fresh tomato juice with celery, lemon, and sea salt. Rich in lycopene.',
      image: 'img/tomato.jpg',
      nutrition: { calories: '80 kcal', protein: '3g', carbs: '16g', sugar: '10g' },
      prices: { small: '$6.49', medium: '$7.99', large: '$9.49' }
    },
    'Carrot Citrus Boost': {
      title: 'Carrot Citrus Boost',
      description: 'A refreshing blend of carrots, apples, and oranges for energy and radiant skin.',
      image: 'img/veg.jpg',
      nutrition: { calories: '80 kcal', protein: '3g', carbs: '16g', sugar: '10g' },
      prices: { small: '$6.49', medium: '$7.99', large: '$9.49' }
    },
    'Avocado Green Punch': {
      title: 'Avocado Green Punch',
      description: 'Creamy avocado blended with spinach, apple, and lemon. Perfect for detox.',
      image: 'img/veg1.jpg',
      nutrition: { calories: '80 kcal', protein: '3g', carbs: '16g', sugar: '10g' },
      prices: { small: '$6.49', medium: '$7.99', large: '$9.49' }
    },
    'Purple Power Berry': {
      title: 'Purple Power Berry',
      description: 'Blueberry, raspberry & cherry yogurt blend packed with antioxidants.',
      image: 'img/rasbery.jpg',
      nutrition: { calories: '320 kcal', protein: '8g', carbs: '60g', sugar: '30g' },
      prices: { small: '$8.49', medium: '$9.99', large: '$11.49' }
    },
    'Cherry Lime Refresher': {
      title: 'Cherry Lime Refresher',
      description: 'Cherry, lime & Greek yogurt combo for a refreshing twist.',
      image: 'img/lime.jpg',
      nutrition: { calories: '340 kcal', protein: '5g', carbs: '70g', sugar: '50g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'Watermelon Sunrise': {
      title: 'Watermelon Sunrise',
      description: 'Watermelon, strawberry & banana refresher.',
      image: 'img/water.jpg',
      nutrition: { calories: '340 kcal', protein: '5g', carbs: '70g', sugar: '50g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'Ginger Mango Berry Boost': {
      title: 'Ginger Mango Berry Boost',
      description: 'Mango & berry mix with a zing of ginger.',
      image: 'img/ginger.jpg',
      nutrition: { calories: '340 kcal', protein: '5g', carbs: '70g', sugar: '50g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'Berry Breakfast Smoothie': {
      title: 'Berry Breakfast Smoothie',
      description: 'A filling blend of mixed berries, banana, oats, and almond milk.',
      image: 'img/berry.jpg',
      nutrition: { calories: '340 kcal', protein: '5g', carbs: '70g', sugar: '50g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'tropical-dream': {
      title: 'Tropical Dream Smoothie',
      description: 'A tropical blend of mango, pineapple, banana, and coconut milk.',
      image: 'img/topical.jpg',
      nutrition: { calories: '340 kcal', protein: '5g', carbs: '70g', sugar: '50g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'Peanut Butter Muscle Fuel': {
      title: 'Peanut Butter Muscle Fuel',
      description: 'Peanut butter & banana blend with 30g protein.',
      image: 'img/peanut.jpg',
      nutrition: { calories: '380 kcal', protein: '25g', carbs: '40g', sugar: '20g' },
      prices: { small: '$9.49', medium: '$10.99', large: '$12.49' }
    },
    'Strawberry Whey Burst': {
      title: 'Strawberry Whey Burst',
      description: 'Strawberry almond milk shake with whey protein (22g).',
      image: 'img/stawb.jpg',
      nutrition: { calories: '380 kcal', protein: '25g', carbs: '40g', sugar: '20g' },
      prices: { small: '$9.49', medium: '$10.99', large: '$12.49' }
    },
    'Mocha Energy Builder': {
      title: 'Mocha Energy Builder',
      description: 'Coffee + chocolate + whey = 26g protein and a caffeine boost.',
      image: 'img/mocha.jpg',
      nutrition: { calories: '380 kcal', protein: '25g', carbs: '40g', sugar: '20g' },
      prices: { small: '$9.49', medium: '$10.99', large: '$12.49' }
    },
    'Mango Recovery Shake': {
      title: 'Mango Recovery Shake',
      description: 'Mango + vanilla protein + Greek yogurt for 24g muscle support.',
      image: 'img/mango.jpg',
      nutrition: { calories: '380 kcal', protein: '25g', carbs: '40g', sugar: '20g' },
      prices: { small: '$9.49', medium: '$10.99', large: '$12.49' }
    },
    'chocolate-protein': {
      title: 'Chocolate Protein Power',
      description: 'Rich chocolate shake with 25g of protein, perfect post-workout.',
      image: 'img/choclate.jpg',
      nutrition: { calories: '380 kcal', protein: '25g', carbs: '40g', sugar: '20g' },
      prices: { small: '$9.49', medium: '$10.99', large: '$12.49' }
    },
    'vanilla-protein': {
      title: 'Vanilla Bean Protein',
      description: 'Smooth vanilla shake with banana, almond milk, and 20g of protein.',
      image: 'img/vanila.jpg',
      nutrition: { calories: '360 kcal', protein: '20g', carbs: '45g', sugar: '25g' },
      prices: { small: '$8.99', medium: '$10.49', large: '$11.99' }
    },
    'hot-apple-cider': {
      title: 'Hot Spiced Apple Cider',
      description: 'A warming winter favorite with cinnamon, cloves, star anise, and orange.',
      image: 'img/hot.jpg',
      nutrition: { calories: '140 kcal', protein: '1g', carbs: '35g', sugar: '30g' },
      prices: { small: '$6.49', medium: '$7.99', large: '$9.49' }
    },
    'Hot Cocoa Hazelnut Delight': {
      title: 'Hot Cocoa Hazelnut Delight',
      description: 'Rich dark chocolate blended with creamy hazelnut, topped with whipped cream.',
      image: 'img/choco.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Gingerbread Latte': {
      title: 'Gingerbread Latte',
      description: 'Bold espresso with gingerbread spices and molasses.',
      image: 'img/gingerlate.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Cranberry Orange Punch (Hot)t': {
      title: 'Cranberry Orange Punch (Hot)',
      description: 'Zesty cranberry juice simmered with orange slices, cinnamon, and star anise.',
      image: 'img/cherrycup.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Vanilla Chai Bliss': {
      title: 'Vanilla Chai Bliss',
      description: 'A cozy mix of black tea, vanilla, and aromatic chai spices.',
      image: 'img/vanillla.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Turmeric Golden Milk': {
      title: 'Turmeric Golden Milk',
      description: 'A soothing blend of turmeric, honey, ginger, and warm milk.',
      image: 'img/turmaric.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Choco Banana Blast': {
      title: 'Choco Banana Blast',
      description: 'Banana, Cocoa Powder, Chocolate Syrup, Low-Fat Milk, Honey.',
      image: 'img/choclate banana.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$8.99', medium: '$9.49', large: '$10.99' }
    },
    'Mocha Nut Fusion': {
      title: 'Mocha Nut Fusion',
      description: 'Espresso Shot, Dark Chocolate, Almond Milk, Crushed Walnuts, Maple Syrup.',
      image: 'img/moch.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$7.99', medium: '$9.49', large: '$10.99' }
    },
    'Choco Avocado Power': {
      title: 'Choco Avocado Power',
      description: 'Avocado, Cocoa Powder, Coconut Milk, Dates, Chia Seeds.',
      image: 'img/avacardo.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$9.36', medium: '$9.49', large: '$10.99' }
    },
    'Peanut Choco Crunch': {
      title: 'Peanut Choco Crunch',
      description: 'Peanut Butter, Cocoa Powder, Low-Fat Milk, Crushed Peanuts, berries, honey.',
      image: 'img/bary.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$6.93', medium: '$9.49', large: '$10.99' }
    },
    'Choco Berry Swirl': {
      title: 'Choco Berry Swirl',
      description: 'Strawberries, Cocoa Powder, Greek Yogurt, Dark Chocolate, Skim Milk.',
      image: 'img/raschoco.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$6.93', medium: '$9.49', large: '$10.99' }
    },
    'Chocolate Banana Bliss': {
      title: 'Chocolate Banana Bliss',
      description: 'Creamy blend of banana, raw cacao, dates, and almond milk.',
      image: 'img/banana.jpg',
      nutrition: { calories: '280 kcal', protein: '6g', carbs: '50g', sugar: '35g' },
      prices: { small: '$5.99', medium: '$9.49', large: '$10.99' }
    },
    'virgin-mojito': {
      title: 'Virgin Mojito',
      description: 'Refreshing blend of lime, mint, soda water, and a touch of sweetness.',
      image: 'img/cucumber.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$7.49', medium: '$8.99', large: '$10.49' }
    },
    'Tropical Sunset': {
      title: 'Tropical Sunset',
      description: 'Pineapple Juice, Orange Juice, Grenadine Syrup, Lemon Juice, Ice.',
      image: 'img/sunset.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$6.89', medium: '$8.99', large: '$10.49' }
    },
    'Blue Lagoon': {
      title: 'Blue Lagoon',
      description: 'Blue Curacao Syrup, Lemonade, Lime Juice, Soda Water, Ice.',
      image: 'img/blue.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$5.49', medium: '$8.99', large: '$10.49' }
    },
    'Strawberry Mint Fizz': {
      title: 'Strawberry Mint Fizz',
      description: 'Fresh Strawberries, Mint Leaves, Lemon Juice, Sparkling Water, Honey.',
      image: 'img/mint.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$7.49', medium: '$8.99', large: '$10.49' }
    },
    'Watermelon Cooler': {
      title: 'Watermelon Cooler',
      description: 'Watermelon Juice, Lime Juice, Basil Leaves, Honey, Ice Cubes.',
      image: 'img/cooler.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$5.35', medium: '$8.99', large: '$10.49' }
    },
    'Pomegranate Sparkler': {
      title: 'Pomegranate Sparkler',
      description: 'Pomegranate Juice, Apple Juice, Lime Juice, Sparkling Water, Ice.',
      image: 'img/pomi.jpg',
      nutrition: { calories: '90 kcal', protein: '0g', carbs: '22g', sugar: '20g' },
      prices: { small: '$6.94', medium: '$8.99', large: '$10.49' }
    }
  };

  if (modal) {
    viewDetailsBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var productId = this.getAttribute('data-product-id');
        var product = products[productId];
        if (product) {
          document.getElementById('modal-image').src = product.image;
          document.getElementById('modal-title').textContent = product.title;
          document.getElementById('modal-description').textContent = product.description;
          document.getElementById('modal-calories').textContent = product.nutrition.calories;
          document.getElementById('modal-protein').textContent = product.nutrition.protein;
          document.getElementById('modal-carbs').textContent = product.nutrition.carbs;
          document.getElementById('modal-sugar').textContent = product.nutrition.sugar;
          document.getElementById('modal-price-small').textContent = product.prices.small;
          document.getElementById('modal-price-medium').textContent = product.prices.medium;
          document.getElementById('modal-price-large').textContent = product.prices.large;
          quantityInput.value = 1;
          modal.classList.add('active');
        }
      });
    });

    closeModalBtn.addEventListener('click', function() { modal.classList.remove('active'); });
    modalOverlay.addEventListener('click', function() { modal.classList.remove('active'); });

    if (decreaseQuantityBtn) {
      decreaseQuantityBtn.addEventListener('click', function() {
        var q = parseInt(quantityInput.value);
        if (q > 1) quantityInput.value = q - 1;
      });
    }
    if (increaseQuantityBtn) {
      increaseQuantityBtn.addEventListener('click', function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
    }

    // Size selection
    var sizeRadios = document.querySelectorAll('input[name="size"]');
    sizeRadios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        document.querySelectorAll('.custom-radio div').forEach(function(div) {
          div.classList.remove('border-primary');
          div.classList.add('border-gray-300');
        });
        if (this.checked) {
          this.nextElementSibling.classList.remove('border-gray-300');
          this.nextElementSibling.classList.add('border-primary');
        }
      });
    });
    if (sizeRadios.length > 0 && sizeRadios[0].checked) {
      sizeRadios[0].nextElementSibling.classList.remove('border-gray-300');
      sizeRadios[0].nextElementSibling.classList.add('border-primary');
    }

    // Cart / Buy
    var addToCartBtn = document.getElementById('add-to-cart');
    var buyNowBtn = document.getElementById('buy-now');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
        alert('Product added to cart!');
        modal.classList.remove('active');
      });
    }
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', function() {
        alert('Proceeding to checkout!');
        modal.classList.remove('active');
      });
    }
  }

  // ===== Rating Stars =====
  var stars = document.querySelectorAll('.rating-star');
  var currentRating = 0;
  if (stars.length > 0) {
    var ratingInput = document.getElementById('rating-input');
    stars.forEach(function(star) {
      star.addEventListener('mouseover', function() {
        var r = parseInt(this.getAttribute('data-rating'));
        stars.forEach(function(s) {
          s.classList.remove('ri-star-fill', 'text-primary', 'text-yellow-400');
          s.classList.add('ri-star-line', 'text-gray-400');
        });
        for (var i = 0; i < r; i++) {
          stars[i].classList.remove('ri-star-line', 'text-gray-400');
          stars[i].classList.add('ri-star-fill', 'text-yellow-400');
        }
      });
      star.addEventListener('click', function() {
        currentRating = parseInt(this.getAttribute('data-rating'));
        if (ratingInput) ratingInput.value = currentRating;
      });
      star.addEventListener('mouseleave', function() {
        stars.forEach(function(s) {
          s.classList.remove('ri-star-fill', 'text-primary', 'text-yellow-400');
          s.classList.add('ri-star-line', 'text-gray-400');
        });
        for (var i = 0; i < currentRating; i++) {
          stars[i].classList.remove('ri-star-line', 'text-gray-400');
          stars[i].classList.add('ri-star-fill', 'text-yellow-400');
        }
      });
    });
  }

  // ===== EmailJS =====
  var feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm && typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'Mm7-pIj2Pvw33JznB' });
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      emailjs.sendForm('service_kigvcb9', 'template_jyr9d7n', this)
        .then(function() { alert('Feedback sent successfully!'); },
              function(err) { alert('Sending failed. Try again.'); console.error('FAILED...', err); });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
