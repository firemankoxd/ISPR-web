let ball = new Circle(ball_x, ball_y, ball_r);
let data = new VisuData();

Update();

function Circle(x, y, r, strokeColor = "#000000") {
  this.x = x;
  this.y = y;
  this.r = r;
  this.strokeColor = strokeColor;
  this.sinInd = 0;
  this.sinNums = [3,2,1];
  this.sinUp = true;

  this.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  this.gradient = function() {
      let ball_gradient = ctx.createLinearGradient(this.x - this.r, this.y + this.r, this.x + this.r / 2, this.y - this.r * 1.2);
      ball_gradient.addColorStop(0, "white");
      ball_gradient.addColorStop(0.4, "white");
      ball_gradient.addColorStop(1, "#6b6b6b");
      ctx.fillStyle = ball_gradient;
  }

  this.step = function() {
    if(data.systemStatus) {
      if(data.setHeight > data.realHeight) {
        data.realHeight++;
      } else if (data.setHeight < data.realHeight) {
        data.realHeight--; 
      }
    } else {
      //data.realHeight = 0;
      if(data.realHeight > 0) data.realHeight--;
    }
  }

  this.update = function(new_y) {
    this.y = new_y * (2 * this.r - canvas.height) / 100 + canvas.height - this.r;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.gradient();
    this.draw();
  }
}

function VisuData(systemStatus = false,
                  realHeight = 0,
                  setHeight = 0,
                  sinusStatus = false, 
                  sinusFreq = 0,
                  pwmStatus = false, 
                  pwmValue = 0,
                  PID_customvals_enable = false,
                  PID_P_enable = false,
                  PID_I_enable = false,
                  PID_D_enable = false,
                  PID_P_val = 0.0,
                  PID_I_val = 0.0,
                  PID_D_val = 0.0,
                  PID_TL_val = 0.0
                  ) {
  this.systemStatus = systemStatus;
  this.realHeight = realHeight;
  this.setHeight = setHeight;
  this.sinusStatus = sinusStatus;
  this.sinusFreq = sinusFreq;
  this.pwmStatus = pwmStatus;
  this.pwmValue = pwmValue;
  this.PID_customvals_enable = PID_customvals_enable;
  this.PID_P_enable = PID_P_enable;
  this.PID_I_enable = PID_I_enable;
  this.PID_D_enable = PID_D_enable;
  this.PID_P_val = PID_P_val;
  this.PID_I_val = PID_I_val;
  this.PID_D_val = PID_D_val;
  this.PID_TL_val = PID_TL_val;

  this.update = function() {
    // this.realHeight = (this.systemStatus) ? this.setHeight : 0;
    document.getElementById("statusText").innerHTML = (this.systemStatus == false) ? "Vypnutý" : "Zapnutý";
    document.getElementById("sinusStatus").innerHTML = (this.sinusStatus == false) ? "Vypnuté" : "Zapnuté";
    document.getElementById("pwmStatus").innerHTML = (this.pwmStatus == false) ? "Vypnuté" : "Zapnuté";
    document.getElementById("PID_customvals_enable").innerHTML = (this.PID_customvals_enable == false) ? "Default" : "Manuálne";
    document.getElementById("PID_P_enable").innerHTML = (this.PID_P_enable == false) ? "Vypnutá" : "Zapnutá";
    document.getElementById("PID_I_enable").innerHTML = (this.PID_I_enable == false) ? "Vypnutá" : "Zapnutá";
    document.getElementById("PID_D_enable").innerHTML = (this.PID_D_enable == false) ? "Vypnutá" : "Zapnutá";
    document.getElementById("statusText").style.color = (this.systemStatus == false) ? "red" : "green";
    document.getElementById("sinusStatus").style.color = (this.sinusStatus == false) ? "red" : "green";
    document.getElementById("pwmStatus").style.color = (this.pwmStatus == false) ? "red" : "green";
    document.getElementById("PID_P_enable").style.color = (this.PID_P_enable == false) ? "red" : "green";
    document.getElementById("PID_I_enable").style.color = (this.PID_I_enable == false) ? "red" : "green";
    document.getElementById("PID_D_enable").style.color = (this.PID_D_enable == false) ? "red" : "green";
    document.getElementById("submit-startStop-button").value = (this.systemStatus == false) ? "Štart" : "Stop";
    document.getElementById("submit-sinus-button").value = (this.sinusStatus == false) ? "Zapnúť" : "Vypnúť";
    document.getElementById("submit-pwm-button").value = (this.pwmStatus == false) ? "Zapnúť" : "Vypnúť";
    document.getElementById("submit-PID-customvals-status-button").value = (this.PID_customvals_enable == false) ? "Manuálne" : "Default";
    document.getElementById("submit-P-status-button").value = (this.PID_P_enable == false) ? "Zapnúť" : "Vypnúť";
    document.getElementById("submit-I-status-button").value = (this.PID_I_enable == false) ? "Zapnúť" : "Vypnúť";
    document.getElementById("submit-D-status-button").value = (this.PID_D_enable == false) ? "Zapnúť" : "Vypnúť";
    document.getElementById("realHeight").innerHTML = this.realHeight;
    document.getElementById("setHeight").innerHTML = this.setHeight;
    document.getElementById("sinusFreq").innerHTML = this.sinusFreq;
    document.getElementById("pwmValue").innerHTML = this.pwmValue;
    document.getElementById("PID_P_val").innerHTML = this.PID_P_val;
    document.getElementById("PID_I_val").innerHTML = this.PID_I_val;
    document.getElementById("PID_D_val").innerHTML = this.PID_D_val;
    document.getElementById("PID_TL_val").innerHTML = this.PID_TL_val;
    ball.step();
    ball.update(this.realHeight);
  }
}

function Update() {
  data.update();
  requestAnimationFrame(Update);
}

$(document).ready(function($) {
  $(document).on('submit', '#submit-StartStop', function(event) {
    event.preventDefault();
    data.systemStatus = !(data.systemStatus);
  });
  $(document).on('submit', '#submit-setHeight', function(event) {
    event.preventDefault();
    data.setHeight = document.getElementById("setHeight-value").value;
  });
  $(document).on('submit', '#submit-sinusStatus', function(event) {
    event.preventDefault();
    data.sinusStatus = !(data.sinusStatus);
  });
  $(document).on('submit', '#submit-sinusValue', function(event) {
    event.preventDefault();
    data.sinusFreq = document.getElementById("sinusFreq-value").value;
  });
  $(document).on('submit', '#submit-pwmStatus', function(event) {
    event.preventDefault();
    data.pwmStatus = !(data.pwmStatus);
  });
  $(document).on('submit', '#submit-pwmValue', function(event) {
    event.preventDefault();
    data.pwmValue = document.getElementById("pwmValue-value").value;
  });
  $(document).on('submit', '#submit-PID-customvals-status', function(event) {
    event.preventDefault();
    data.PID_customvals_enable = !(data.PID_customvals_enable);
  });
  $(document).on('submit', '#submit-PID-P-status', function(event) {
    event.preventDefault();
    data.PID_P_enable = !(data.PID_P_enable);
  });
  $(document).on('submit', '#submit-PID-I-status', function(event) {
    event.preventDefault();
    data.PID_I_enable = !(data.PID_I_enable);
  });
  $(document).on('submit', '#submit-PID-D-status', function(event) {
    event.preventDefault();
    data.PID_D_enable = !(data.PID_D_enable);
  });
  $(document).on('submit', '#submit-PID-P-value', function(event) {
    event.preventDefault();
    data.PID_P_val = document.getElementById("submit-P-value-value").value;
  });
  $(document).on('submit', '#submit-PID-I-value', function(event) {
    event.preventDefault();
    data.PID_I_val = document.getElementById("submit-I-value-value").value;
  });
  $(document).on('submit', '#submit-PID-D-value', function(event) {
    event.preventDefault();
    data.PID_D_val = document.getElementById("submit-D-value-value").value;
  });
  $(document).on('submit', '#submit-PID-TL-value', function(event) {
    event.preventDefault();
    data.PID_TL_val = document.getElementById("submit-TL-value-value").value;
  });
});
