import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-twoclickers',
  templateUrl: './twoclickers.component.html',
  styleUrls: ['./twoclickers.component.css']
})
export class TwoclickersComponent implements OnInit {

  constructor() { }

  resources = [
    {
      name: "Food",
      need_id: "needed-food",
      affordable_id: "affordable-food",
      payment_id: "payment-food",
      state: "food-state"
    },

    {
      name: "Gift",
      need_id: "needed-gift",
      affordable_id: "affordable-gift",
      payment_id: "payment-gift",
      state: "gift-state"
    },

    {
      name: "Weapons",
      need_id: "needed-weapon",
      affordable_id: "affordable-weapon",
      payment_id: "payment-weapon",
      state: "weapon-state"
    }
  ]


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
      $("#calculate-tc").click(function () {
        calculate();
      })
      $(".resource-state").change(function () {
        distributeResources();

        if ($(this).prop("checked"))
          $(this).parent().parent().addClass("border-success").removeClass("border-danger");
        else
          $(this).parent().parent().removeClass("border-success").addClass("border-danger");

      })
      $("#tc-clear-btn").click(function () {
        $("#tc-container input[type='text']").val("");
      })
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

    /* Validations Start */
    var integerNums = /^[0-9]+$/;
    var decimalNums = /^[0-9]+(.[0-9]{1,3})?$/;

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

    function isEmpty(input) {
      input.trim();

      if (input == "")
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

    /* Validations End */


    /* Variables Start */
    var currentGold,
      salary,
      foodLimits,
      GiftLimits,
      Medkits,
      foodPrice,
      giftPrice,
      weaponPrice,
      duration,
      isMotivating;
    /* Variables End */

    /* Inputs Binding Start */
    $(".decimal-num").keyup(function () {
      DecimalsTester(this);

    })

    $(".int-num").keyup(function () {
      IntegersTester(this);

    })
    /* Inputs Binding End */

    /* Calculations Start*/
    function calculate() {

      if (!isValid()) {
        return;
      }

      currentGold = $("#current-gold").val();
      currentGold = parseFloat(currentGold);

      salary = $("#salary-per-day").val();
      salary = parseFloat(salary);

      foodLimits = $("#food-limits").val();
      foodLimits = parseInt(foodLimits);

      GiftLimits = $("#gift-limits").val();
      GiftLimits = parseInt(GiftLimits);

      Medkits = $("#medkits").val();
      Medkits = parseInt(Medkits);

      foodPrice = $("#food-price").val();
      foodPrice = parseFloat(foodPrice);

      giftPrice = $("#gift-price").val();
      giftPrice = parseFloat(giftPrice);

      weaponPrice = $("#weapon-price").val();
      weaponPrice = parseFloat(weaponPrice);

      duration = $("#duration").val();
      duration = parseInt(duration);

      isMotivating = $("#motivating-state").prop("checked");

      if (isMotivating) {
        foodLimits += 5 * duration;
      }

      foodLimits += 10 * Medkits;
      GiftLimits += 10 * Medkits;

      currentGold += salary * duration;

      console.log(currentGold);
      console.log(salary);
      console.log(foodLimits);
      console.log(GiftLimits);
      console.log(Medkits);
      console.log(foodPrice);
      console.log(giftPrice);
      console.log(weaponPrice);
      console.log(duration);
      console.log(isMotivating);

      distributeResources();
    }

    function distributeResources() {

      if (!isValid())
        return;

      $(".output").val("")

      var backup = [currentGold, foodLimits, GiftLimits];
      $("#total-gold").val(round(backup[0], 2));

      var $foodState = $("#food-state").prop("checked");
      var $giftState = $("#gift-state").prop("checked");
      var $weaponState = $("#weapon-state").prop("checked");

      console.log($foodState);

      if ($foodState == false)
        backup[1] = 0;

      if ($giftState == false)
        backup[2] = 0;

      console.log("food limits: " + backup[1]);
      console.log("gift limits: " + backup[2]);

      var neededWeapons = (5 * backup[1]) + (5 * backup[2]);
      backup.push(neededWeapons);

      console.log("weapon limits: " + backup[3]);
      if ($weaponState == false)
        backup[3] = 0;

      if ($foodState) {
        var affordable = countingAffordable(backup[0], foodLimits, foodPrice);
        $("#needed-food").val(foodLimits);
        $("#affordable-food").val(affordable);
        $("#payment-food").val(round(affordable * foodPrice, 2));
        backup[0] -= affordable * foodPrice;
      }

      if ($giftState) {
        var affordable = countingAffordable(backup[0], GiftLimits, giftPrice);
        $("#needed-gift").val(GiftLimits);
        $("#affordable-gift").val(affordable);
        $("#payment-gift").val(round(affordable * giftPrice, 2));
        backup[0] -= affordable * giftPrice;
      }

      if ($weaponState) {
        var affordable = countingAffordable(backup[0], neededWeapons, weaponPrice);
        $("#needed-weapon").val(neededWeapons);
        $("#affordable-weapon").val(affordable);
        $("#payment-weapon").val(round(affordable * weaponPrice, 2));
        backup[0] -= affordable * weaponPrice;
      }

      $("#leftover-gold").val(round(backup[0], 2));
    }

    function countingAffordable(gold, amount, price) {
      var count = 0;

      for (let i = 0; i < amount; i++) {
        gold -= price;

        if (gold <= 0) {
          gold += price;
          break;
        }

        count++;
      }

      return count;
    }
    /* Calculations End*/


  }

}