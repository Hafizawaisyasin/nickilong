function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}

$(function () {
	$(".dropdown-item").click(function () {
		var icon_text = $(this).html();
		$(".dropdown-toggle").html(icon_text);
	});
});

$(function () {
	$(".data-trigger").on("click", function () {
		var target_id = $(this).attr("data-trigger");
		$(target_id).toggleClass("show");
		$body.toggleClass("offcanvas-active");
	});

	//close button
	$("btn-close").click(function (e) {
		$(".navbar-collapse").removeClass("show");
		$("body").removeClass(".offcanvas-active");
	});
});

(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend(
				{},
				$.fn.countTo.defaults,
				{
					from: $(this).data("from"),
					to: $(this).data("to"),
					speed: $(this).data("speed"),
					refreshInterval: $(this).data("refresh-interval"),
					decimals: $(this).data("decimals"),
				},
				options
			);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data("countTo") || {};

			$self.data("countTo", data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof settings.onUpdate == "function") {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData("countTo");
					clearInterval(data.interval);
					value = settings.to;

					if (typeof settings.onComplete == "function") {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0, // the number the element should start at
		to: 0, // the number the element should end at
		speed: 1000, // how long it should take to count between the target numbers
		refreshInterval: 100, // how often the element should be updated
		decimals: 0, // the number of decimal places to show
		formatter: formatter, // handler for formatting the value before rendering
		onUpdate: null, // callback method for every time the element is updated
		onComplete: null, // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
})(jQuery);

jQuery(function ($) {
	// custom formatting example
	$(".count-number").data("countToOptions", {
		formatter: function (value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
		},
	});

	// start all the timers
	$(".timer").each(count);

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data("countToOptions") || {});
		$this.countTo(options);
	}
});

//experiment

//to scroll

$(document).ready(function () {
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll > 300) {
			$(".black").css("background", "#4c3c3c");
		} else {
			$(".black").css("background", "#333");
		}
	});
});

//active class

var sections = document.querySelectorAll("section");

onscroll = function () {
	var scrollPosition = document.documentElement.scrollTop;

	sections.forEach((section) => {
		if (
			scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
			scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25
		) {
			var currentId = section.attributes.id.value;
			removeAllActiveClasses();
			addActiveClass(currentId);
		}
	});
};

var removeAllActiveClasses = function () {
	document.querySelectorAll("nav a").forEach((el) => {
		el.classList.remove("active");
	});
};

var addActiveClass = function (id) {
	// console.log(id);
	var selector = `nav a[href="#${id}"]`;
	document.querySelector(selector).classList.add("active");
};

var navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		var currentId = e.target.attributes.href.value;
		var section = document.querySelector(currentId);
		var sectionPos = section.offsetTop;
		// section.scrollIntoView({
		//   behavior: "smooth",
		// });

		window.scroll({
			top: sectionPos,
			behavior: "smooth",
		});
	});
});

/*parralax*/
