import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-mercenaries',
  templateUrl: './mercenaries.component.html',
  styleUrls: ['./mercenaries.component.css']
})
export class MercenariesComponent implements OnInit {

  constructor() { }

  resources = [
    {
      name: "Food",
      before_id: "food-before",
      after_id: "food-after",
      price_id: "food-price",
      intOnlyId: "food-int-only",
      leftOversId: "food-leftovers"
    },

    {
      name: "Gift",
      before_id: "gift-before",
      after_id: "gift-after",
      price_id: "gift-price",
      intOnlyId: "gift-int-only",
      leftOversId: "gift-leftovers"
    },

    {
      name: "Weapons",
      before_id: "weapon-before",
      after_id: "weapon-after",
      price_id: "weapon-price",
      intOnlyId: "weapon-int-only",
      leftOversId: "weapon-leftovers"
    }
  ]

  ngOnInit() {

    var rotatingDegree;
    $(document).ready(function () {
      initializer();
    })

    $(window).on('resize', function () {
      sizeChanged();
    });

    function initializer() {
      sizeChanged();
      $("h6").addClass("input-label");
      $("input[type='text']").addClass("form-control");
      $(".output").prop("readonly", true);
      $("h5").next(".info").slideToggle();

      $("h5").click(function () {
        toggleInfoPanel(this);
      });

      $("#food-after, #food-before").keyup(function () {
        resourceControlUnit("food-after", "food-before", this, "food-int-only", "food-leftovers");
      });

      $("#gift-after, #gift-before").keyup(function () {
        resourceControlUnit("gift-after", "gift-before", this, "gift-int-only", "gift-leftovers");
      });

      $("#weapon-after, #weapon-before").keyup(function () {
        resourceControlUnit("weapon-after", "weapon-before", this, "weapon-int-only", "weapon-leftovers");
      });

      $("#food-price, #gift-price, #weapon-price, #million-price").keyup(function () {
        DecimalsTester(this);
      });

      $("#bh-count, #damage-done").keyup(function () {
        IntegersTester(this);
      });

      $("#calculate").click(function () {
        calculate();
      })

      $("#clear-btn").click(function(){
        $("input[type='text']").val("").removeClass("is-valid is-invalid");
      })
    }

    function sizeChanged() {
      var $width = $(window).width();

      if ($width <= 768) {
        smallWindowButtons();
        addPadding();
        rotatingDegree = 45;
      }
      else {
        bigWindowButtons();
        removePadding();
        rotatingDegree = 225;
      }

    }

    function addPadding(){
      $(".resource-container h5").css("padding", "3% 6%")
    }
    
    function removePadding(){
      $(".resource-container h5").css("padding", "1% 2%")
    }

    function bigWindowButtons() {
      $("button").removeClass("btn-lg w-100");
      $(".btn-group button").addClass("w-100");
    }

    function smallWindowButtons() {
      $("button").addClass("btn-lg w-100");
    }

    function toggleInfoPanel(pTag) {

      var $isOpened = $(pTag).next(".info").css("display");

      if ($isOpened != "none") {
        $(pTag).next(".info").slideUp(300);
        $(pTag).children("i").css({ 'transform': 'rotate(' + 0 + 'deg)' })
        $(pTag).css({ 'borderRadius': '5px' })
      }

      else {
        $(pTag).next(".info").slideDown(300);
        $(pTag).children("i").css({ 'transform': 'rotate(' + rotatingDegree + 'deg)' })
        $(pTag).css({ 'borderRadius': '5px 5px 0 0' })
      }

    }

    /* Real Coding */

    var integerNums = /^[0-9]+$/;
    var decimalNums = /^[0-9]+(.[0-9]{1,3})?$/;

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    function integerTest(number) {
      if (integerNums.test(number))
        return true;
      else
        return false;
    }

    function decimalTest(number) {
      if (decimalNums.test(number))
        return true;
      else
        return false;
    }

    function isLess(before, after) {

      after = parseInt(after);
      before = parseInt(before);

      /* if the limit value after is larger that makes no sense */
      if (after < before)
        return true;
      else
        return false;

    }

    function isEmpty(input) {
      input.trim();

      if (input == "")
        return true;
      else
        return false;
    }

    function resourceControlUnit(afterId, beforeId, clicked, int_id, leftovers_id) {

      var $clicked = $("#" + clicked.id);
      var $after = $("#" + afterId);
      var $before = $("#" + beforeId);


      var intCheck = $("#" + int_id);
      var leftoverCheck = $("#" + leftovers_id);

      var $clickedValue = $clicked.val();
      var $afterValue = $after.val();
      var $beforeValue = $before.val();

      /* Check Clicked Value */
      if (isEmpty($clickedValue)) {
        $clicked.removeClass("is-invalid is-valid");
        return;
      }

      else if (!integerTest($clickedValue)) {
        $clicked.addClass("is-invalid").removeClass("is-valid");
        intCheck.prop("checked", false);
        return;
      }

      else {
        $clicked.removeClass("is-invalid").addClass("is-valid");
        intCheck.prop("checked", true);
      }

      /* Checking for empty Inputs */
      if (isEmpty($beforeValue) || isEmpty($afterValue)) {
        intCheck.prop("checked", false);
        leftoverCheck.prop("checked", false);
        return;
      }

      /* Comparing Numbers */
      if (!isLess($beforeValue, $afterValue)) {
        $after.addClass("is-invalid").removeClass("is-valid");
        leftoverCheck.prop("checked", false);
        return;
      }
      else {
        $after.removeClass("is-invalid").addClass("is-valid");
        leftoverCheck.prop("checked", true);

        return;
      }

    }

    function DecimalsTester(pTag) {

      var $clicked = $("#" + pTag.id);
      var $clickedValue = $("#" + pTag.id).val();

      if (isEmpty($clickedValue)) {
        $clicked.removeClass("is-invalid is-valid");
        return;
      }

      else if (!decimalTest($clickedValue)) {
        $clicked.addClass("is-invalid").removeClass("is-valid");
        return;
      }

      else {
        $clicked.removeClass("is-invalid").addClass("is-valid");
      }

    }

    function IntegersTester(pTag) {

      var $clicked = $("#" + pTag.id);
      var $clickedValue = $("#" + pTag.id).val();

      if (isEmpty($clickedValue)) {
        $clicked.removeClass("is-invalid is-valid");
        return;
      }

      else if (!integerTest($clickedValue)) {
        $clicked.addClass("is-invalid").removeClass("is-valid");
        return;
      }

      else {
        $clicked.removeClass("is-invalid").addClass("is-valid");
      }
    }

    function isValid(){
      /* Stupid yet functional */
      var isValid = true;
      console.log(isValid);

      $('.int-num').each(function () {
        if (!integerNums.test($(this).val())) {
          isValid = false;
        }
      });

      $('.decimal-num').each(function () {
        if (!decimalNums.test($(this).val())) {
          isValid = false;
        }
      });

      return isValid;
    }

    function calculate() {
      
      if (!isValid())
      return;
            
      var food = (($("#food-before").val() - $("#food-after").val())) * $("#food-price").val()
      var gift = (($("#gift-before").val() - $("#gift-after").val())) * $("#gift-price").val()
      var weapon = ($("#weapon-before").val() - $("#weapon-after").val()) * $("#weapon-price").val()
      
      var payment = ($("#bh-count").val() * 5) + (($("#damage-done").val()) * $("#million-price").val());

      let $bh = $("#bh-count").val();
      let $dmg = $("#damage-done").val();
      let $price = $("#million-price").val();

      var expenses = food + gift + weapon;
      
      payment = round(payment, 2)
      expenses = round(expenses, 2)
      
      console.log("Food: " + food);
      console.log("gift: " + gift);
      console.log("weapon: " + weapon);
      console.log("payment: " + payment);
      console.log("expenses: " + expenses);
      console.log("bh: " + $bh);
      console.log("dmg: " + $dmg);
      console.log("price: " + $price);

      $("#expenses").val(expenses);
      $("#payment").val(payment);
      $("#profit").val(round(payment - expenses, 2));
    }
  }

}
