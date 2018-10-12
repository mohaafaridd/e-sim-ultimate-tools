import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Typed from 'typed.js';
import { WOW } from 'wowjs'

@Component({
  selector: 'app-monetary',
  templateUrl: './monetary.component.html',
  styleUrls: ['./monetary.component.css']
})
export class MonetaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {

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
    }

    function sizeChanged() {
      var $width = $(window).width();

      if ($width <= 768) {
        smallWindowButtons();
        smallWindowButtonGroup();
      }
      else {
        bigWindowButtons();
        bigWindowButtonGroup();
      }

    }

    function bigWindowButtons() {
      $("button").removeClass("btn-lg w-100");
      $(".btn-group button").addClass("w-100");
    }

    function smallWindowButtons() {
      $("button").addClass("btn-lg w-100");
    }

    function bigWindowButtonGroup() {
      $(".btn-group-vertical").addClass("btn-group");
      $(".btn-group-vertical").removeClass("btn-group-vertical");
    }

    function smallWindowButtonGroup() {
      $(".btn-group").addClass("btn-group-vertical");
      $(".btn-group").removeClass("btn-group")
    }

    /* Switching Options */
    $(".mm-toggle").click(function () {
      option[0] = !option[0];
      option[1] = !option[1];

      if (option[0])
        $(".mm-option").text("Goal");
      else
        $(".mm-option").text("Repetition");
    })

    $(".ls-toggle").click(function () {
      interest[0] = !interest[0];
      interest[1] = !interest[1];

      if (interest[0])
        $(".ls-option").text("Percentage");
      else
        $(".ls-option").text("Static");
    })

    /* Real Coding */
    var value = []; // 0 for market - 1 for loan
    var price = []; // 0 for sell - 1 for buy

    var option = [false, true]; // 0 for goal - 1 for repetition
    var optionVal;

    var interest = [false, true]; // 0 for percentage - 1 for Static
    var interestVal;

    var duration; // loan duration


    /* Clearing */

    $("#clear-btn-mm").click(function () {
      $("#money-market-container input[type='text']").val("").removeClass("is-valid is-invalid");
      $(".modal-content ul").empty();
    })

    $("#clear-btn-ls").click(function () {
      $("#loan-system-container input[type='text']").val("").removeClass("is-valid is-invalid");
    })

    /* testing inputs */
    var integerNums = /^[0-9]+$/;
    var decimalNums = /^[0-9]+(.[0-9]{1,4})?$/;
    function isEmpty(input) {
      input.trim();

      if (input == "")
        return true;
      else
        return false;
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

    function isValid() {
      /* Stupid yet functional */
      var isValid = true;

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

    /* binding inputs */
    $("#mm-value, #ls-value").keyup(function () {
      if (this.id == "mm-value")
        value[0] = $(this).val();
      else
        value[1] = $(this).val();

      DecimalsTester(this);
    });

    $("#mm-sell-price, #mm-buy-price").keyup(function () {
      if (this.id == "mm-sell-price")
        price[0] = $(this).val();
      else
        price[1] = $(this).val();

      DecimalsTester(this);
    });

    $("#mm-input, #ls-input").keyup(function () {
      if (this.id == "mm-input") {
        IntegersTester(this);
        optionVal = $(this).val();
      }
      else {
        DecimalsTester(this);
        interestVal = $(this).val();
      }
    })

    $("#ls-duration").keyup(function () {
      IntegersTester(this);
      duration = $(this).val();
    })

    /* Calculations */
    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    function appendListItem(value) {
      $(".modal-content ul").append('<li class="list-group-item text-dark"> ' + round(value, 2) + '</li>');
    }

    $("#mm-calculate").click(function () {

      if (!isValid()) {
        return;
      }

      var initialGold = parseFloat($("#mm-value").val());
      var sellPrice = parseFloat(price[0]); // sell price
      var buyPrice = parseFloat(price[1]); // buy price
      var goal = parseFloat(optionVal); // setting the goal
      var repeat = parseFloat(optionVal); // setting the goal
      var increment = buyPrice * sellPrice;

      if (increment <= 1 || (option[0] && goal < initialGold)) {

        alert("Review your values, your money won't be increasing");

        return;
      }

      $(".modal-content ul").empty();

      switch (option[0]) {
        case true:
          var x = 0; // redo times 

          appendListItem(initialGold);

          while (goal >= initialGold) {
            initialGold *= increment;
            appendListItem(round(initialGold, 2));
            x++;
          }

          $("#gains").val(x + " repeat");
          $("#overflow").val(round((initialGold - goal), 2));
          break;

        case false:

          for (let i = 0; i < repeat; i++) {
            initialGold *= increment;
            appendListItem(round(initialGold, 2));
          }

          $("#gains").val(round(initialGold, 2) + " gold");
          $("#overflow").val("");
          break;
      }

    })

    $("#ls-calculate").click(function () {

    

      if (!isValid()) {
        return;
      }

      var gold = value[1];
      gold = parseFloat(gold);

      var goldInterest = parseFloat(interestVal);
      var percentageInterest = parseFloat(interestVal) / 100;

      switch (interest[0]) {
        case false:
          for (let i = 0; i < duration; i++) {
            gold += goldInterest;
          }
          break;

        case true:
          var _interest = gold * percentageInterest;
          for (let i = 0; i < duration; i++) {
            gold += _interest;
          }
          $("#loan-increament").val(round(_interest, 2));
          break;
      }

      $("#ls-gains").val(round(gold, 2));
    })

  }

}
