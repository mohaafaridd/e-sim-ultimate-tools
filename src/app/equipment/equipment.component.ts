import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

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


    /* Real Coding */

    /* Global Variables */
    var targetedQuality, initialQuality;

    /* Choose Starting Quality Action */
    $("#start-quality button").click(function () {
      initialQuality = ($(this).children("span").text());
      targetedQuality = "";
      colorize(this);
      $("#target-quality button").prop('disabled', true);

      for (let i = initialQuality; i < 6; i++) {
        $("#target-quality button").eq(i - 1).prop('disabled', false);
      }
    });

    $("#target-quality button").click(function () {
      targetedQuality = ($(this).children("span").text());
      console.log(targetedQuality);
      colorize(this);
    });

    function colorize(e) {
      var starting = ($(e).children("span").text());

      resetBtn($(e).parent());
      resetBtn($("#target-quality"));

      switch (starting) {
        case "1":
          $(e).css("backgroundColor", "#dc3545");
          $(e).css("borderColor", "#dc3545");
          $(e).css("color", "#fff")
          break;

        case "2":
          $(e).css("backgroundColor", "#E65100");
          $(e).css("borderColor", "#E65100");
          $(e).css("color", "#fff")
          break;

        case "3":
          $(e).css("backgroundColor", "#FFFF8D");
          $(e).css("borderColor", "#FFFF8D");
          $(e).css("color", "#000")
          break;

        case "4":
          $(e).css("backgroundColor", "#2E7D32");
          $(e).css("borderColor", "#2E7D32");
          $(e).css("color", "#fff")
          break;

        case "5":
          $(e).css("backgroundColor", "#4527A0");
          $(e).css("borderColor", "#4527A0");
          $(e).css("color", "#fff")
          break;

        case "6":
          $(e).css("backgroundColor", "#0277BD");
          $(e).css("borderColor", "#0277BD");
          $(e).css("color", "#fff")
          break;
      }
    }

    function resetBtn(e) {
      $(e).children().css({
        "backgroundColor": "#6c757d",
        "borderColor": "#6c757d",
        "color": "#fff"
      });
    }

    $("#start-quality-price").keyup(function () {
      var regex = /^[0-9]+(.[0-9]{1,2})?$/;
      var text = $(this).val();

      if (regex.test(text)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $(this).next("small").removeClass("text-danger").addClass("text-muted")
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
        $(this).next("small").addClass("text-danger").removeClass("text-muted")
      }
    });


    /* Calculator */
    var equipmentCount,
      equipmentCountPrice,
      totalGameMergeCost;


    function toQuality(mergeCost) {
      equipmentCount *= 3;
      equipmentCountPrice *= 3;
      equipmentCountPrice += mergeCost;
    }

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    $("#calculate").click(function () {

      var regex = /^[0-9]+(.[0-9]{1,2})?$/;
      var price = $("#start-quality-price").val();
      initialQuality = initialQuality.trim();
      targetedQuality = targetedQuality.trim();

      if (!regex.test(price) || initialQuality == "" || targetedQuality == "") {
          return;
      }
  
      equipmentCount = 1;
      equipmentCountPrice = price;
      totalGameMergeCost = 0;

      
    switch (initialQuality) {
      case "1": // from q1
        switch (targetedQuality) {
          case "2": // to q2
            toQuality(0.30);
            break;
          case "3": // to q3
            toQuality(0.30);
            toQuality(1);
            break;
          case "4": // to q4
            toQuality(0.30);
            toQuality(1);
            toQuality(3);
            break;
          case "5": // to q5
            toQuality(0.30);
            toQuality(1);
            toQuality(3);
            toQuality(9);
            break;
          case "6": // to q6
            toQuality(0.30);
            toQuality(1);
            toQuality(3);
            toQuality(9);
            toQuality(27);
            break;
        }
        break;

      case "2": // from q2
        switch (targetedQuality) {
          case "3": // to q3
            toQuality(1);
            break;
          case "4": // to q4
            toQuality(1);
            toQuality(3);
            break;
          case "5": // to q5
            toQuality(1);
            toQuality(3);
            toQuality(9);
            break;
          case "6": // to q6
            toQuality(1);
            toQuality(3);
            toQuality(9);
            toQuality(27);
            break;
        }
        break;

      case "3": // from q3
        switch (targetedQuality) {
          case "4": // to q4
            toQuality(3);
            break;
          case "5": // to q5
            toQuality(3);
            toQuality(9);
            break;
          case "6": // to q6
            toQuality(3);
            toQuality(9);
            toQuality(27);
            break;
        }
        break;

      case "4": // from q4
        switch (targetedQuality) {
          case "5": // to q5
            toQuality(9);
            break;
          case "6": // to q6
            toQuality(9);
            toQuality(27);
            break;
        }
        break;

      case "5": // from q5
        switch (targetedQuality) {
          case "6": // to q6
            toQuality(27);
            break;
        }
        break;
    }


    totalGameMergeCost = round(equipmentCountPrice, 2) - (price * equipmentCount);
    totalGameMergeCost = round(totalGameMergeCost, 2)

    $("#no-equipment-needed").val(equipmentCount);
    $("#no-equipment-needed-price").val(round(price * equipmentCount, 2));
    $("#game-merging-cost").val(totalGameMergeCost);
    $("#total-cost").val(round(equipmentCountPrice, 2));

  });





  }

}
