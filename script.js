document.addEventListener("DOMContentLoaded", () => {
  flatpickr("#dob", {
    dateFormat: "d-m-Y",
    locale: "vn",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const nameInput = document.getElementById("name");
  const dobInput = document.getElementById("dob");
  const resultsLayout = document.getElementById("results-layout");
  const bottomSections = document.getElementById("bottom-sections");
  const lifePathNumberP = document.getElementById("life-path-number");
  const destinyNumberP = document.getElementById("destiny-number");
  const personalityNumberP = document.getElementById("personality-number");
  const soulUrgeNumberP = document.getElementById("soul-urge-number");
  const attitudeNumberP = document.getElementById("attitude-number");
  const maturityNumberP = document.getElementById("maturity-number");
  const personalYearP = document.getElementById("personal-year");
  const chartCells = document.querySelectorAll(".chart-cell");
  const numerologyDetails = document.getElementById("numerology-details");
  const karmicDebtSection = document.getElementById("karmic-debt-section");
  const karmicDebtList = document.getElementById("karmic-debt-list");
  const pyramidContainer = document.getElementById("pyramid-container");
  const pyramidPeak1 = document.getElementById("pyramid-peak-1");
  const pyramidPeak2 = document.getElementById("pyramid-peak-2");
  const pyramidPeak3 = document.getElementById("pyramid-peak-3");
  const pyramidPeak4 = document.getElementById("pyramid-peak-4");
  const pyramidAge1 = document.getElementById("pyramid-age-1");
  const pyramidAge2 = document.getElementById("pyramid-age-2");
  const pyramidAge3 = document.getElementById("pyramid-age-3");
  const pyramidAge4 = document.getElementById("pyramid-age-4");
  const pyramidMeaningsDiv = document.getElementById("pyramid-meanings");
  const pyramidBaseMonth = document.getElementById("pyramid-base-month");
  const pyramidBaseDay = document.getElementById("pyramid-base-day");
  const pyramidBaseYear = document.getElementById("pyramid-base-year");
  const chartArrowsDiv = document.getElementById("chart-arrows");
  const planesOfExpressionContainer = document.getElementById(
    "planes-of-expression-container"
  );
  const planesOfExpressionDetails = document.getElementById(
    "planes-of-expression-details"
  );
  const personalYearCycleContainer = document.getElementById(
    "personal-year-cycle-container"
  );
  const personalYearCycleDetails = document.getElementById(
    "personal-year-cycle-details"
  );
  const reportsSection = document.getElementById("reports-section");
  const personalDayNumberSpan = document.getElementById("personal-day-number");
  const personalDayMeaningP = document.getElementById("personal-day-meaning");
  const personalMonthNumberSpan = document.getElementById(
    "personal-month-number"
  );
  const personalMonthMeaningP = document.getElementById(
    "personal-month-meaning"
  );
  const compatibilitySection = document.getElementById("compatibility-section");
  const partnerDobInput = document.getElementById("partner-dob");
  const compatibilityResults = document.getElementById("compatibility-results");

  const nameToNumberMap = {
    A: 1,
    J: 1,
    S: 1,
    B: 2,
    K: 2,
    T: 2,
    C: 3,
    L: 3,
    U: 3,
    D: 4,
    M: 4,
    V: 4,
    E: 5,
    N: 5,
    W: 5,
    F: 6,
    O: 6,
    X: 6,
    G: 7,
    P: 7,
    Y: 7,
    H: 8,
    Q: 8,
    Z: 8,
    I: 9,
    R: 9,
  };

  function reduceToSingleDigit(number, allowMasterNumber = true) {
    if (typeof number !== "number") {
      number = parseInt(number, 10);
      if (isNaN(number)) return null;
    }

    if (
      allowMasterNumber &&
      (number === 11 || number === 22 || number === 33)
    ) {
      return number;
    }

    while (number > 9) {
      let sum = 0;
      const strNum = number.toString();
      for (const digit of strNum) {
        sum += parseInt(digit, 10);
      }
      number = sum;
    }
    return number;
  }

  function reduceNonMaster(number) {
    if (typeof number !== "number") {
      number = parseInt(number, 10);
      if (isNaN(number)) return null;
    }

    while (number > 9) {
      if (number === 11 || number === 22 || number === 33) {
        // Master numbers are not reduced further in this specific reduction
        return number;
      }
      let sum = 0;
      const strNum = number.toString();
      for (const digit of strNum) {
        sum += parseInt(digit, 10);
      }
      number = sum;
    }
    return number;
  }

  function sumDigits(number) {
    if (typeof number !== "number") {
      number = parseInt(number, 10);
      if (isNaN(number)) return null;
    }
    let sum = 0;
    const strNum = number.toString();
    for (const digit of strNum) {
      sum += parseInt(digit, 10);
    }
    return sum;
  }

  function calculateLifePathNumber(dob) {
    if (!dob) return null;
    const [year, month, day] = dob.split("-").map(Number);
    const sumMonth = sumDigits(month);
    const sumDay = sumDigits(day);
    const sumYear = sumDigits(year);
    const total = sumMonth + sumDay + sumYear;
    return reduceToSingleDigit(total);
  }

  function calculateDestinyNumber(name) {
    if (!name) return null;
    const normalizedName = name.toUpperCase().replace(/\s/g, "");
    let total = 0;
    for (const char of normalizedName) {
      if (nameToNumberMap[char]) {
        total += nameToNumberMap[char];
      }
    }
    return reduceToSingleDigit(total);
  }

  function isVowel(char, name) {
    const vowels = "AEIOU";
    if (vowels.includes(char)) {
      return true;
    }
    if (char === "Y") {
      const index = name.indexOf(char);
      if (index === -1) return false;

      const prevChar = index > 0 ? name[index - 1] : "";
      const nextChar = index < name.length - 1 ? name[index + 1] : "";

      const isPrevVowel = vowels.includes(prevChar);
      const isNextVowel = vowels.includes(nextChar);

      return !isPrevVowel && !isNextVowel;
    }
    return false;
  }

  function calculateSoulUrgeNumber(name) {
    if (!name) return null;
    const normalizedName = name.toUpperCase().replace(/\s/g, "");
    let total = 0;
    for (const char of normalizedName) {
      if (isVowel(char, normalizedName) && nameToNumberMap[char]) {
        total += nameToNumberMap[char];
      }
    }
    return reduceToSingleDigit(total);
  }

  function calculatePersonalityNumber(name) {
    if (!name) return null;
    const normalizedName = name.toUpperCase().replace(/\s/g, "");
    let total = 0;
    for (const char of normalizedName) {
      if (!isVowel(char, normalizedName) && nameToNumberMap[char]) {
        total += nameToNumberMap[char];
      }
    }
    return reduceToSingleDigit(total);
  }

  function calculateAttitudeNumber(dob) {
    if (!dob) return null;
    const [year, month, day] = dob.split("-").map(Number);
    const total = sumDigits(day) + sumDigits(month);
    return reduceToSingleDigit(total);
  }

  function calculateMaturityNumber(lifePath, destiny) {
    if (lifePath === null || destiny === null) return null;
    const total = reduceNonMaster(lifePath) + reduceNonMaster(destiny);
    return reduceToSingleDigit(total);
  }

  function calculatePersonalYear(dob, year) {
    if (!dob || !year) return null;
    const [_, month, day] = dob.split("-").map(Number);
    const total = sumDigits(day) + sumDigits(month) + sumDigits(year);
    return reduceToSingleDigit(total, false); // Không rút gọn Master Number
  }

  function calculatePyramid(dob, lifePath) {
    if (!dob || lifePath === null) return null;
    const [year, month, day] = dob.split("-").map(Number);

    // Các con số cơ sở rút gọn
    const reducedMonth = reduceToSingleDigit(month, false);
    const reducedDay = reduceToSingleDigit(day, false);
    const reducedYear = reduceToSingleDigit(year, false);

    // Tính 4 đỉnh
    const peak1 = reduceToSingleDigit(reducedMonth + reducedDay, false);
    const peak2 = reduceToSingleDigit(reducedDay + reducedYear, false);
    const peak3 = reduceToSingleDigit(peak1 + peak2, false);
    const peak4 = reduceToSingleDigit(reducedMonth + reducedYear, false); // Sửa lại công thức tính đỉnh 4

    // Tính tuổi của các đỉnh
    const lifePathReduced = reduceToSingleDigit(lifePath, false);
    const peakAge1 = 36 - lifePathReduced;
    const peakAge2 = peakAge1 + 9;
    const peakAge3 = peakAge2 + 9;
    const peakAge4 = peakAge3 + 9;

    return {
      base: { month: reducedMonth, day: reducedDay, year: reducedYear },
      peaks: {
        p1: { num: peak1, age: peakAge1 },
        p2: { num: peak2, age: peakAge2 },
        p3: { num: peak3, age: peakAge3 },
        p4: { num: peak4, age: peakAge4 },
      },
    };
  }

  function findKarmicDebt(numbers) {
    const karmicDebts = [13, 14, 16, 19];
    const foundDebts = [];
    for (const num of numbers) {
      if (karmicDebts.includes(num)) {
        foundDebts.push(num);
      }
    }
    return [...new Set(foundDebts)];
  }

  function calculatePlanesOfExpression(name) {
    if (!name) return null;
    const normalizedName = name.toUpperCase().replace(/\s/g, "");
    let physical = 0;
    let mental = 0;
    let emotional = 0;
    let spiritual = 0; // Thêm mặt phẳng tâm linh/trực giác

    for (const char of normalizedName) {
      const num = nameToNumberMap[char];
      if (!num) continue;

      const singleDigit = reduceToSingleDigit(num, false);

      if ([4, 5].includes(singleDigit)) {
        physical++;
      } else if ([1, 8].includes(singleDigit)) {
        mental++;
      } else if ([2, 3, 6].includes(singleDigit)) {
        emotional++;
      } else if ([7, 9].includes(singleDigit)) {
        spiritual++;
      }
    }
    return { physical, mental, emotional, spiritual };
  }

  function renderPersonalYearCycle(dob) {
    if (!dob) {
      personalYearCycleContainer.classList.add("hidden");
      return;
    }
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentPersonalYear = calculatePersonalYear(dob, currentYear);

    let html = `
      <p class="personal-year-intro">
        Năm cá nhân hiện tại của bạn (<strong>${currentYear}</strong>) là <span class="highlight-year">${currentPersonalYear}</span>. 
        Đây là con số định hướng năng lượng cho cả năm của bạn.
      </p>
      <h4 class="timeline-title">Dự đoán chu kỳ 9 năm tới của bạn</h4>
      <div class="personal-year-timeline">
    `;

    for (let i = 0; i < 9; i++) {
      const year = currentYear + i;
      const personalYearNumber = calculatePersonalYear(dob, year);
      const meaning = numerologyMeanings.personalYear[personalYearNumber];
      const isCurrent = year === currentYear ? "current-year" : "";

      html += `
        <div class="timeline-item ${isCurrent}">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-year-header">
              <span class="year-label">Năm ${year}</span>
              <span class="personal-year-badge">Số ${personalYearNumber}</span>
            </div>
            <p class="timeline-meaning">${meaning}</p>
          </div>
        </div>
      `;
    }

    html += `</div>`;
    personalYearCycleDetails.innerHTML = html;
    personalYearCycleContainer.classList.remove("hidden");
  }

  const numerologyMeanings = {
    lifePath: {
      1: "Bạn là người tiên phong, dũng cảm và độc lập. Bạn có khả năng lãnh đạo bẩm sinh, luôn khao khát được đứng đầu. Bạn cần học cách lắng nghe và kiểm soát cái tôi cá nhân để thành công hơn.",
      2: "Bạn là người hòa giải, nhạy cảm và hợp tác. Bạn có trực giác tốt và khả năng ngoại giao tuyệt vời. Hãy tin tưởng vào bản thân và tránh để cảm xúc chi phối quá nhiều.",
      3: "Bạn là người sáng tạo, lạc quan và có khả năng giao tiếp tốt. Bạn có khiếu hài hước và thích truyền cảm hứng cho người khác. Cần rèn luyện sự tập trung để không bị phân tán năng lượng.",
      4: "Bạn là người có trách nhiệm, kỷ luật và đáng tin cậy. Bạn có phương pháp làm việc khoa học và logic. Hãy cẩn thận với sự cứng nhắc và học cách thích nghi với thay đổi.",
      5: "Bạn là người yêu thích tự do, phiêu lưu và có khả năng thích ứng cao. Bạn luôn khao khát khám phá những điều mới mẻ. Cần học cách kiên định và hoàn thành mục tiêu đến cùng.",
      6: "Bạn là người có trách nhiệm, yêu thương và luôn quan tâm đến gia đình, cộng đồng. Bạn có khả năng chữa lành và mang lại sự bình yên cho người khác. Đôi khi bạn có thể quá cầu toàn và hy sinh quá nhiều.",
      7: "Bạn là người có khả năng phân tích, nghiên cứu và thích sự yên tĩnh. Bạn có tư duy sâu sắc và thích tìm hiểu về triết lý. Hãy mở lòng hơn với thế giới bên ngoài và tránh sống quá nội tâm.",
      8: "Bạn là người có tầm nhìn, quyền lực và thành công về tài chính. Bạn có khả năng lãnh đạo và quản lý xuất sắc. Cần chú ý đến sự cân bằng giữa công việc và cuộc sống, và tránh ham muốn vật chất quá mức.",
      9: "Bạn là người có lòng trắc ẩn, bao dung và lý tưởng nhân đạo. Bạn có trái tim rộng lớn và sẵn sàng cống hiến cho xã hội. Hãy học cách chấp nhận thực tế và cân bằng giữa cho đi và nhận lại.",
      11: "Số chủ đạo 11 là con số Master, biểu tượng của trực giác mạnh mẽ và khả năng truyền cảm hứng. Bạn có tiềm năng lớn để trở thành một nhà lãnh đạo tinh thần. Cần học cách cân bằng năng lượng và tránh căng thẳng quá độ.",
      22: "Số chủ đạo 22 là con số Master, biểu tượng của sự hiện thực hóa. Bạn có sức mạnh để biến những ước mơ lớn thành hiện thực. Hãy học cách sử dụng sức mạnh này một cách tích cực và tránh làm việc quá sức.",
      33: "Số 33 là Master Number, biểu tượng của tình yêu thương vô điều kiện và trách nhiệm cộng đồng. Bạn có khả năng chữa lành và truyền cảm hứng cho người khác. Cần học cách cân bằng giữa việc giúp đỡ người khác và chăm sóc bản thân.",
    },
    destiny: {
      1: "Sứ mệnh của bạn là trở thành người tiên phong, dũng cảm đối mặt với thử thách và lãnh đạo người khác.",
      2: "Sứ mệnh của bạn là hòa giải, hàn gắn các mối quan hệ và tạo ra sự cân bằng trong môi trường xung quanh.",
      3: "Sứ mệnh của bạn là sử dụng sự sáng tạo và khả năng giao tiếp để truyền cảm hứng và mang lại niềm vui cho mọi người.",
      4: "Sứ mệnh của bạn là xây dựng một nền tảng vững chắc, tổ chức và tạo ra sự ổn định cho bản thân và những người xung quanh.",
      5: "Sứ mệnh của bạn là trải nghiệm cuộc sống, khám phá những điều mới mẻ và truyền cảm hứng về sự tự do cho người khác.",
      6: "Sứ mệnh của bạn là chăm sóc, yêu thương và tạo ra một môi trường hạnh phúc, hòa thuận cho gia đình và cộng đồng.",
      7: "Sứ mệnh của bạn là tìm kiếm sự thật, học hỏi và chia sẻ kiến thức sâu sắc với thế giới.",
      8: "Sứ mệnh của bạn là đạt được thành công về vật chất, phát triển quyền lực và sử dụng nó để tạo ra những giá trị bền vững.",
      9: "Sứ mệnh của bạn là cống hiến cho nhân loại, truyền tải lòng trắc ẩn và lan tỏa tình yêu thương đến mọi người.",
      11: "Sứ mệnh của bạn là khai phá và sử dụng trực giác nhạy bén để dẫn dắt, chữa lành cho cộng đồng, trở thành một người thầy tâm linh.",
      22: "Sứ mệnh của bạn là xây dựng những công trình vĩ đại, tạo ra những giá trị có ích cho xã hội trên quy mô lớn.",
    },
    personality: {
      1: "Bạn thường được người khác nhìn nhận là người mạnh mẽ, độc lập và có ý chí lãnh đạo. Bạn gây ấn tượng bởi sự tự tin và quyết đoán.",
      2: "Bạn được nhìn nhận là một người tinh tế, nhạy cảm và dễ gần. Bạn có sức hút từ sự điềm tĩnh và khả năng lắng nghe.",
      3: "Bạn là người vui vẻ, hoạt bát và sáng tạo. Bạn luôn thu hút sự chú ý của mọi người bởi sự duyên dáng và khả năng ăn nói.",
      4: "Bạn được nhìn nhận là một người đáng tin cậy, có tổ chức và nguyên tắc. Sự ổn định và cẩn thận của bạn tạo nên sự an tâm cho người khác.",
      5: "Bạn thường gây ấn tượng bởi sự năng động, ham học hỏi và thích khám phá. Bạn có phong thái tự do và thích nghi nhanh.",
      6: "Bạn được nhìn nhận là người ấm áp, quan tâm và đáng tin. Bạn tạo ra cảm giác an toàn và sự chở che cho những người xung quanh.",
      7: "Bạn là người bí ẩn, sâu sắc và có vẻ nội tâm. Bạn thường gây tò mò bởi sự thông thái và khả năng quan sát tinh tế.",
      8: "Bạn được nhìn nhận là một người mạnh mẽ, có uy tín và tự tin. Bạn có phong thái của một nhà lãnh đạo, luôn tạo ra cảm giác quyền lực và thành công.",
      9: "Bạn là người nhân hậu, bao dung và có lý tưởng cao đẹp. Bạn gây ấn tượng bởi sự rộng lượng và tinh thần vì cộng đồng.",
      11: "Bạn toát ra vẻ bí ẩn, có sức hút mạnh mẽ. Bạn được nhìn nhận là người có trực giác tốt và khả năng truyền cảm hứng.",
      22: "Bạn gây ấn tượng với người khác bởi sự tự tin và khả năng thực hiện những điều lớn lao, phi thường.",
    },
    soulUrge: {
      1: "Bên trong bạn khao khát được độc lập, tự chủ và được công nhận. Bạn có động lực mạnh mẽ để đứng trên đôi chân của mình.",
      2: "Bên trong bạn khao khát sự hòa hợp, yêu thương và cân bằng. Bạn luôn muốn tạo ra sự kết nối sâu sắc với người khác.",
      3: "Bên trong bạn khao khát được thể hiện bản thân, sáng tạo và truyền cảm hứng. Bạn có nhu cầu lớn về sự giao tiếp và tương tác xã hội.",
      4: "Bên trong bạn khao khát sự ổn định, an toàn và có trật tự. Bạn có mong muốn xây dựng một nền tảng vững chắc cho cuộc sống.",
      5: "Bên trong bạn khao khát sự tự do, phiêu lưu và trải nghiệm. Bạn luôn muốn phá vỡ giới hạn và khám phá những điều mới mẻ.",
      6: "Bên trong bạn khao khát sự yêu thương, trách nhiệm và phục vụ. Bạn có mong muốn mãnh liệt được chăm sóc và giúp đỡ người khác.",
      7: "Bên trong bạn khao khát sự tĩnh lặng, tìm kiếm kiến thức và sự thật. Bạn muốn khám phá thế giới nội tâm và những bí ẩn của cuộc sống.",
      8: "Bên trong bạn khao khát sự thành công, quyền lực và sự giàu có. Bạn có động lực mạnh mẽ để đạt được những mục tiêu lớn về vật chất.",
      9: "Bên trong bạn khao khát sự cống hiến, lòng trắc ẩn và lý tưởng nhân đạo. Bạn muốn dùng sức mạnh của mình để giúp đỡ toàn nhân loại.",
      11: "Bên trong bạn khao khát phát triển trực giác và khả năng tâm linh. Bạn muốn trở thành người truyền cảm hứng, dẫn dắt người khác trên con đường tinh thần.",
      22: "Bên trong bạn khao khát tạo ra một di sản vĩ đại, xây dựng những công trình có ích và tác động tích cực đến xã hội.",
    },
    attitude: {
      1: "Bạn thường có thái độ tích cực, tự tin và sẵn sàng đối mặt với thử thách.",
      2: "Bạn có thái độ nhạy cảm, hòa nhã và luôn cố gắng tránh xung đột.",
      3: "Bạn có thái độ cởi mở, vui vẻ và lạc quan. Bạn dễ dàng hòa nhập với mọi người.",
      4: "Bạn có thái độ nghiêm túc, có trách nhiệm và luôn tuân thủ nguyên tắc.",
      5: "Bạn có thái độ tò mò, thích phiêu lưu và sẵn sàng đón nhận những thay đổi.",
      6: "Bạn có thái độ quan tâm, chu đáo và luôn sẵn lòng giúp đỡ người khác.",
      7: "Bạn có thái độ hướng nội, điềm tĩnh và thích quan sát, phân tích.",
      8: "Bạn có thái độ quyết đoán, mạnh mẽ và luôn hướng tới mục tiêu.",
      9: "Bạn có thái độ bao dung, hào phóng và có tinh thần nhân đạo.",
      11: "Bạn có thái độ nhạy bén, trực giác cao và luôn nhìn mọi thứ từ một góc độ sâu sắc hơn.",
      22: "Bạn có thái độ tự tin, tham vọng và luôn muốn biến những ý tưởng lớn thành hiện thực.",
    },
    maturity: {
      1: "Ở tuổi trưởng thành, bạn sẽ phát triển mạnh mẽ khả năng lãnh đạo, trở thành người dẫn đầu trong lĩnh vực của mình.",
      2: "Ở tuổi trưởng thành, bạn sẽ phát triển sự nhạy cảm, trực giác và trở thành người hòa giải, kết nối mọi người.",
      3: "Ở tuổi trưởng thành, bạn sẽ sử dụng khả năng sáng tạo và giao tiếp để truyền cảm hứng và mang lại niềm vui cho cuộc sống.",
      4: "Ở tuổi trưởng thành, bạn sẽ xây dựng một nền tảng vững chắc, đạt được sự ổn định và đáng tin cậy trong sự nghiệp và cuộc sống.",
      5: "Ở tuổi trưởng thành, bạn sẽ tìm thấy sự cân bằng giữa tự do và trách nhiệm, khám phá và trải nghiệm cuộc sống một cách sâu sắc.",
      6: "Ở tuổi trưởng thành, bạn sẽ tìm thấy sự thỏa mãn trong việc chăm sóc gia đình và cộng đồng, trở thành một chỗ dựa vững chắc cho mọi người.",
      7: "Ở tuổi trưởng thành, bạn sẽ phát triển trí tuệ, sự thông thái và tìm ra con đường tâm linh của riêng mình.",
      8: "Ở tuổi trưởng thành, bạn sẽ đạt được thành công lớn về vật chất, quyền lực và học cách sử dụng nó một cách khôn ngoan.",
      9: "Ở tuổi trưởng thành, bạn sẽ trở thành một người có ảnh hưởng lớn, cống hiến cho cộng đồng và lan tỏa lòng nhân ái.",
      11: "Ở tuổi trưởng thành, bạn sẽ khai phá hết tiềm năng của mình, trở thành một người thầy tâm linh hoặc lãnh đạo tinh thần.",
      22: "Ở tuổi trưởng thành, bạn sẽ có khả năng thực hiện những dự án lớn, tạo ra những giá trị vĩ đại cho xã hội.",
    },
    personalDay: {
      1: "Một ngày của sự khởi đầu, hãy mạnh dạn bắt đầu những dự án mới.",
      2: "Một ngày của sự hợp tác và ngoại giao, hãy tìm kiếm sự kết nối.",
      3: "Một ngày tuyệt vời để sáng tạo và giao tiếp, hãy thể hiện bản thân.",
      4: "Một ngày để làm việc chăm chỉ, tổ chức và xây dựng nền tảng.",
      5: "Một ngày của sự thay đổi và phiêu lưu, hãy cởi mở với những điều mới.",
      6: "Một ngày để tập trung vào gia đình và trách nhiệm, hãy dành thời gian cho người thân.",
      7: "Một ngày để suy ngẫm, học hỏi và phát triển nội tâm.",
      8: "Một ngày của thành công về vật chất, hãy mạnh dạn ra quyết định tài chính.",
      9: "Một ngày của sự kết thúc và buông bỏ, hãy dọn dẹp không gian và tâm trí.",
    },
    personalMonth: {
      1: "Tháng của những khởi đầu mới, hãy chủ động và độc lập hơn.",
      2: "Tháng của sự hợp tác, hãy học cách làm việc nhóm và lắng nghe.",
      3: "Tháng của sự sáng tạo và thể hiện bản thân, hãy tận hưởng những niềm vui.",
      4: "Tháng của công việc và kỷ luật, hãy sắp xếp lại công việc và mục tiêu.",
      5: "Tháng của sự thay đổi, hãy cởi mở với những cơ hội mới và du lịch.",
      6: "Tháng của gia đình và trách nhiệm, hãy quan tâm đến những người xung quanh.",
      7: "Tháng của sự phát triển nội tâm, hãy dành thời gian cho bản thân và học hỏi.",
      8: "Tháng của thành công tài chính, hãy mạnh dạn đầu tư và đưa ra quyết định.",
      9: "Tháng của sự kết thúc, hãy buông bỏ những điều không còn phù hợp.",
    },
    personalYear: {
      1: "Đây là năm khởi đầu cho một chu kỳ 9 năm. Bạn sẽ cảm thấy tràn đầy năng lượng và sẵn sàng cho những dự án mới. Hãy gieo những hạt giống cho tương lai.",
      2: "Năm nay là về sự hợp tác và kiên nhẫn. Đây là thời điểm tuyệt vời để xây dựng các mối quan hệ và làm việc nhóm. Hãy học cách lắng nghe và chia sẻ.",
      3: "Năm nay là năm của sự sáng tạo và giao tiếp. Bạn sẽ có nhiều cơ hội để thể hiện bản thân, tham gia vào các hoạt động xã hội. Hãy mở lòng và kết nối với mọi người.",
      4: "Năm nay tập trung vào sự ổn định và xây dựng nền tảng. Bạn cần lập kế hoạch, làm việc chăm chỉ và kỷ luật. Đây là thời điểm lý tưởng để đầu tư vào các dự án dài hạn.",
      5: "Năm nay là năm của sự thay đổi và tự do. Bạn sẽ có nhiều cơ hội để khám phá những điều mới mẻ. Hãy linh hoạt và sẵn sàng thích nghi với những thay đổi bất ngờ.",
      6: "Năm nay là năm của trách nhiệm và tình yêu thương. Bạn cần dành nhiều sự quan tâm cho gia đình và cộng đồng. Đây cũng là thời điểm tốt để chăm sóc bản thân và các mối quan hệ.",
      7: "Năm nay là năm của sự tĩnh lặng và phát triển nội tâm. Bạn cần dành thời gian để suy ngẫm, học hỏi và tìm kiếm sự thật. Tránh các hoạt động xã hội quá nhiều.",
      8: "Năm nay là năm của quyền lực và thành công. Bạn sẽ có nhiều cơ hội để đạt được mục tiêu tài chính và phát triển sự nghiệp. Hãy mạnh dạn hành động và tin tưởng vào khả năng của mình.",
      9: "Năm nay là năm kết thúc một chu kỳ. Đây là thời điểm để nhìn lại, buông bỏ những điều không còn phù hợp và chuẩn bị cho một khởi đầu mới. Hãy làm việc thiện và chia sẻ lòng nhân ái của mình.",
    },
    pyramid: {
      1: "Giai đoạn này là lúc bạn phải học cách tự chủ, đứng lên bằng chính đôi chân của mình và phát triển sự độc lập. Bạn sẽ đối mặt với những thử thách đòi hỏi sự quyết đoán và dũng cảm.",
      2: "Giai đoạn này tập trung vào các mối quan hệ. Bạn sẽ học được bài học về sự hợp tác, kiên nhẫn và ngoại giao. Đây là lúc bạn cần xây dựng sự kết nối, tin tưởng và học cách thấu hiểu người khác.",
      3: "Giai đoạn này là lúc bạn cần thể hiện sự sáng tạo và khả năng giao tiếp của mình. Bạn có thể gặp những cơ hội để phát triển bản thân thông qua nghệ thuật, viết lách hoặc các hoạt động xã hội.",
      4: "Giai đoạn này yêu cầu bạn phải có kỷ luật, kiên trì và làm việc chăm chỉ. Bạn sẽ xây dựng nền tảng vững chắc cho tương lai, có thể là sự nghiệp, gia đình hoặc một dự án lớn.",
      5: "Giai đoạn này mang đến sự thay đổi và những chuyến phiêu lưu. Bạn sẽ được khuyến khích bước ra khỏi vùng an toàn, khám phá những điều mới mẻ và học cách thích ứng linh hoạt.",
      6: "Giai đoạn này xoay quanh trách nhiệm với gia đình và cộng đồng. Bạn sẽ học được bài học về tình yêu thương vô điều kiện và sự hy sinh. Đây là lúc bạn đóng vai trò là người chăm sóc, hàn gắn và mang lại sự ổn định cho những người thân yêu.",
      7: "Giai đoạn này dành cho sự phát triển nội tâm. Bạn sẽ có xu hướng tìm kiếm sự thật, học hỏi và dành thời gian cho bản thân. Đây là lúc bạn phát triển trí tuệ, trực giác và sự hiểu biết sâu sắc về cuộc sống.",
      8: "Giai đoạn này tập trung vào quyền lực và sự thành công. Bạn sẽ có những cơ hội lớn về tài chính và sự nghiệp. Bài học là học cách cân bằng giữa vật chất và tinh thần, sử dụng sức mạnh của mình một cách khôn ngoan.",
      9: "Giai đoạn này là sự kết thúc và buông bỏ. Bạn sẽ học cách nhìn lại quá khứ, hoàn thành những việc còn dang dở và chuẩn bị cho một chu kỳ mới. Đây là lúc bạn cần phát triển lòng trắc ẩn và sự bao dung.",
    },
    arrows: {
      "1-2-3":
        "Mũi tên Kế hoạch: Bạn là người có đầu óc tổ chức, thích lên kế hoạch và sắp xếp mọi thứ một cách khoa học.",
      "4-5-6":
        "Mũi tên Ý chí: Bạn là người có ý chí mạnh mẽ, kiên định và quyết tâm cao độ để đạt được mục tiêu.",
      "7-8-9":
        "Mũi tên Hoạt động: Bạn là người năng động, thích hành động và có khả năng thực thi mạnh mẽ.",
      "1-4-7":
        "Mũi tên Thực tế: Bạn là người sống thực tế, có tư duy logic và thích những điều rõ ràng, cụ thể.",
      "2-5-8":
        "Mũi tên Cân bằng cảm xúc: Bạn là người nhạy cảm, giàu tình cảm và có khả năng thấu hiểu cảm xúc của người khác.",
      "3-6-9":
        "Mũi tên Trí tuệ: Bạn là người có trí tuệ phát triển, giàu trí tưởng tượng và khả năng sáng tạo dồi dào.",
      "1-5-9":
        "Mũi tên Quyết tâm: Bạn là người có mục tiêu rõ ràng và không ngừng nỗ lực để đạt được chúng.",
      "3-5-7":
        "Mũi tên Nhạy cảm tâm linh: Bạn là người có trực giác tốt và khả năng kết nối với thế giới tâm linh.",
      "khuyet-1-2-3":
        "Mũi tên Hỗn loạn: Bạn dễ bị mất phương hướng, thiếu kế hoạch và gặp khó khăn trong việc tổ chức công việc.",
      "khuyet-4-5-6":
        "Mũi tên Trì hoãn: Bạn có xu hướng trì hoãn, thiếu động lực và khó khăn trong việc đưa ra quyết định.",
      "khuyet-7-8-9":
        "Mũi tên Thụ động: Bạn thiếu tính hành động, ngại thay đổi và khó khăn trong việc thực thi ý tưởng.",
      "khuyet-1-4-7":
        "Mũi tên Thiếu thực tế: Bạn có xu hướng mơ mộng, thiếu logic và khó khăn trong việc áp dụng lý thuyết vào thực tế.",
      "khuyet-2-5-8":
        "Mũi tên Nhạy cảm quá mức: Bạn có thể quá nhạy cảm, dễ bị tổn thương và thiếu khả năng kiểm soát cảm xúc.",
      "khuyet-3-6-9":
        "Mũi tên Trí nhớ kém: Bạn có thể gặp khó khăn trong việc ghi nhớ và tiếp thu kiến thức mới.",
      "khuyet-1-5-9":
        "Mũi tên Quyết tâm kém: Bạn dễ bỏ cuộc, thiếu kiên nhẫn và khó khăn trong việc hoàn thành mục tiêu.",
      "khuyet-3-5-7":
        "Mũi tên Thiếu tự tin: Bạn có thể thiếu tự tin, ngại giao tiếp và khó khăn trong việc thể hiện bản thân.",
    },
    karmicDebt: {
      13: "Bạn có **Nợ nghiệp 13**. Đây là bài học về sự lười biếng và thiếu kỷ luật. Bạn cần học cách làm việc có hệ thống, kiên trì và hoàn thành mọi việc đến cùng.",
      14: "Bạn có **Nợ nghiệp 14**. Đây là bài học về sự lạm dụng tự do và mất cân bằng. Bạn cần học cách tiết chế, giữ gìn sự ổn định và không để bị cuốn vào những cám dỗ.",
      16: "Bạn có **Nợ nghiệp 16**. Đây là bài học về sự kiêu ngạo và cái tôi. Bạn cần học cách khiêm tốn, chấp nhận và phát triển trực giác của mình.",
      19: "Bạn có **Nợ nghiệp 19**. Đây là bài học về sự lạm dụng quyền lực và thiếu trách nhiệm. Bạn cần học cách lắng nghe và sử dụng sức mạnh của mình một cách khôn ngoan.",
    },
    planesOfExpression: {
      physical: {
        high: "Bạn có nhiều con số trên mặt phẳng Thể chất. Điều này cho thấy bạn là người có năng lượng dồi dào, thích hành động và làm việc bằng tay chân. Bạn sống thực tế và có khả năng làm việc chăm chỉ, kiên trì để đạt được mục tiêu.",
        average:
          "Bạn có một số con số trên mặt phẳng Thể chất. Bạn có sự cân bằng giữa hành động và suy nghĩ. Bạn không quá dựa vào thể chất nhưng vẫn đủ năng lượng để làm những việc cần thiết.",
        low: "Bạn có ít hoặc không có con số trên mặt phẳng Thể chất. Bạn có xu hướng sống nội tâm hơn, ít quan tâm đến hoạt động thể chất. Bạn cần học cách hành động quyết đoán hơn và kết nối với thế giới vật chất.",
      },
      mental: {
        high: "Bạn có nhiều con số trên mặt phẳng Tinh thần. Bạn là người có tư duy nhanh nhạy, sáng tạo và thích học hỏi. Bạn có khả năng diễn đạt ý tưởng tốt và luôn tìm kiếm sự phát triển trí tuệ.",
        average:
          "Bạn có một số con số trên mặt phẳng Tinh thần. Bạn có sự cân bằng giữa suy nghĩ và cảm nhận. Bạn có thể tư duy logic nhưng không quá lý trí, vẫn để cảm xúc dẫn lối.",
        low: "Bạn có ít hoặc không có con số trên mặt phẳng Tinh thần. Bạn có thể gặp khó khăn trong việc thể hiện ý tưởng và cần rèn luyện khả năng tư duy, phân tích một cách có hệ thống hơn.",
      },
      emotional: {
        high: "Bạn có nhiều con số trên mặt phẳng Cảm xúc. Bạn là người có trực giác nhạy bén, giàu tình cảm và dễ dàng thấu hiểu người khác. Bạn thường sống dựa trên cảm xúc và sự đồng cảm.",
        average:
          "Bạn có một số con số trên mặt phẳng Cảm xúc. Bạn có sự cân bằng giữa cảm xúc và lý trí. Bạn có thể thấu hiểu người khác nhưng vẫn giữ được sự khách quan cần thiết.",
        low: "Bạn có ít hoặc không có con số trên mặt phẳng Cảm xúc. Bạn có thể gặp khó khăn trong việc thể hiện cảm xúc và kết nối với người khác. Bạn cần học cách lắng nghe và thấu hiểu bản thân hơn.",
      },
    },
    compatibility: {
      "1-1":
        "Hai người đều mạnh mẽ và độc lập. Cần học cách nhường nhịn để tránh xung đột.",
      "1-2":
        "Sự kết hợp giữa lãnh đạo (1) và hòa giải (2) có thể tạo nên một cặp đôi cân bằng.",
      "1-3":
        "Sự kết hợp năng động và sáng tạo. Cả hai cùng thúc đẩy nhau phát triển.",
      "1-4":
        "Người số 1 muốn đổi mới, người số 4 thích ổn định. Cần học cách chấp nhận sự khác biệt.",
      "1-5": "Hai người đầy phiêu lưu, mạo hiểm. Cần cẩn thận với sự bốc đồng.",
      "1-6":
        "Người số 1 độc lập, người số 6 hướng về gia đình. Cần tìm sự cân bằng giữa tự do và trách nhiệm.",
      "1-7": "Một bên thực tế, một bên nội tâm. Cần có sự tôn trọng lẫn nhau.",
      "1-8":
        "Cặp đôi quyền lực, cùng nhau đạt được thành công lớn. Cần cẩn thận với cái tôi quá cao.",
      "1-9":
        "Sự kết hợp giữa người tiên phong (1) và người vị tha (9). Có thể cùng nhau thực hiện những điều vĩ đại.",
      "2-2":
        "Hai người đều nhạy cảm và quan tâm đến cảm xúc của nhau. Cần tránh sự phụ thuộc quá mức.",
      "2-3":
        "Người số 2 nhạy cảm, người số 3 sáng tạo. Họ có thể truyền cảm hứng cho nhau.",
      "2-4": "Sự kết hợp bền vững, cùng nhau xây dựng một nền tảng vững chắc.",
      "2-5":
        "Người số 2 thích sự ổn định, người số 5 thích phiêu lưu. Cần học cách thỏa hiệp.",
      "2-6":
        "Đây là một sự kết hợp hòa hợp và lãng mạn. Họ cùng nhau xây dựng gia đình hạnh phúc.",
      "2-7":
        "Cả hai đều nhạy cảm và sâu sắc. Cần cẩn thận để không quá khép kín.",
      "2-8":
        "Người số 2 hỗ trợ, người số 8 quyết đoán. Họ có thể giúp nhau thành công.",
      "2-9":
        "Cả hai đều có lòng trắc ẩn, cùng nhau làm những việc ý nghĩa cho cộng đồng.",
      "3-3":
        "Một cặp đôi vui vẻ, sáng tạo. Cần học cách quản lý tài chính và tránh lãng phí năng lượng.",
      "3-4":
        "Người số 3 sáng tạo, người số 4 thực tế. Họ có thể bù trừ cho nhau.",
      "3-5":
        "Hai người đều yêu thích sự tự do và giao tiếp. Cần cẩn thận để không quá bốc đồng.",
      "3-6": "Một sự kết hợp hài hòa giữa sáng tạo (3) và trách nhiệm (6).",
      "3-7":
        "Người số 3 hướng ngoại, người số 7 hướng nội. Họ có thể học hỏi từ nhau.",
      "3-8":
        "Sự kết hợp giữa sáng tạo (3) và quyền lực (8). Họ có thể cùng nhau tạo ra những điều lớn lao.",
      "3-9":
        "Một sự kết hợp đầy sáng tạo và nhân văn. Cùng nhau truyền cảm hứng cho người khác.",
      "4-4":
        "Hai người đều chăm chỉ và thực tế. Cần cẩn thận để tránh trở nên quá cứng nhắc.",
      "4-5":
        "Một bên thích ổn định, một bên thích thay đổi. Cần học cách thỏa hiệp và tôn trọng không gian riêng.",
      "4-6":
        "Một sự kết hợp bền vững và ổn định, cùng nhau xây dựng một gia đình hạnh phúc.",
      "4-7":
        "Cả hai đều logic và sâu sắc. Cần học cách thể hiện cảm xúc nhiều hơn.",
      "4-8":
        "Sự kết hợp đầy quyền lực và tham vọng. Cùng nhau đạt được thành công lớn.",
      "4-9":
        "Người số 4 thực tế, người số 9 vị tha. Cùng nhau tạo ra những giá trị bền vững.",
      "5-5":
        "Hai người đầy đam mê, yêu thích tự do. Cần cẩn thận với sự thiếu cam kết.",
      "5-6":
        "Người số 5 thích phiêu lưu, người số 6 thích ổn định gia đình. Cần tìm sự cân bằng.",
      "5-7":
        "Sự kết hợp giữa khám phá thế giới bên ngoài (5) và thế giới nội tâm (7).",
      "5-8":
        "Cả hai đều mạnh mẽ và tham vọng. Có thể đạt được thành công nhưng cần cẩn thận với sự bốc đồng.",
      "5-9":
        "Sự kết hợp giữa người yêu tự do (5) và người vị tha (9). Họ có thể cùng nhau đi khắp thế giới.",
      "6-6":
        "Hai người đều hướng về gia đình và trách nhiệm. Cần cẩn thận để không quá lo lắng.",
      "6-7":
        "Người số 6 quan tâm đến người khác, người số 7 tập trung vào nội tâm. Họ có thể bù đắp cho nhau.",
      "6-8":
        "Cả hai đều có trách nhiệm và tham vọng. Cùng nhau xây dựng một cuộc sống sung túc.",
      "6-9":
        "Một sự kết hợp nhân văn và hòa hợp. Họ cùng nhau tạo ra những giá trị tốt đẹp cho cộng đồng.",
      "7-7":
        "Hai người đều sâu sắc và nội tâm. Cần học cách giao tiếp và chia sẻ cảm xúc.",
      "7-8":
        "Người số 7 suy nghĩ, người số 8 hành động. Họ có thể bổ trợ cho nhau.",
      "7-9":
        "Cả hai đều có tầm nhìn xa và sự sâu sắc. Có thể cùng nhau tạo ra những giá trị lớn.",
      "8-8":
        "Một cặp đôi quyền lực và tham vọng. Cần cẩn thận với sự cạnh tranh và cái tôi.",
      "8-9":
        "Người số 8 thực tế, người số 9 lý tưởng. Họ có thể cùng nhau đạt được mục tiêu lớn.",
      "9-9":
        "Hai người đều có lòng trắc ẩn và tầm nhìn rộng. Cần cẩn thận để không quá mơ mộng.",
      // Các số Master
      "11-1":
        "Sự kết hợp giữa trực giác (11) và hành động (1). Cùng nhau tạo ra những điều phi thường.",
      "11-2":
        "Một cặp đôi nhạy cảm và tâm linh. Cùng nhau phát triển trực giác.",
      "11-3":
        "Sự kết hợp giữa trực giác (11) và sáng tạo (3). Họ có thể truyền cảm hứng cho nhau.",
      "11-4":
        "Một bên có tầm nhìn, một bên thực tế. Cần học cách cân bằng giữa hai thế giới.",
      "11-5":
        "Sự kết hợp giữa trực giác (11) và sự tự do (5). Cùng nhau khám phá những điều mới mẻ.",
      "11-6":
        "Người số 11 có tầm nhìn, người số 6 hướng về gia đình. Cần tìm sự cân bằng giữa lý tưởng và trách nhiệm.",
      "11-7":
        "Sự kết hợp giữa trực giác (11) và nội tâm (7). Cùng nhau phát triển tâm linh sâu sắc.",
      "11-8":
        "Một bên có tầm nhìn, một bên có quyền lực. Cùng nhau đạt được thành công lớn.",
      "11-9":
        "Cả hai đều có trực giác và lòng trắc ẩn. Họ có thể cùng nhau thay đổi thế giới.",
      "22-1": "Người số 22 có khả năng hiện thực hóa ý tưởng của người số 1.",
      "22-4":
        "Sự kết hợp giữa tầm nhìn vĩ đại (22) và sự thực tế (4). Cùng nhau xây dựng những công trình lớn.",
      "22-5":
        "Người số 22 thích ổn định, người số 5 thích phiêu lưu. Cần học cách thỏa hiệp.",
      "22-6":
        "Sự kết hợp giữa tầm nhìn (22) và trách nhiệm (6). Cùng nhau tạo ra những giá trị bền vững.",
      "22-8": "Cả hai đều có tham vọng lớn. Cùng nhau xây dựng một đế chế.",
      "22-9":
        "Sự kết hợp giữa tầm nhìn toàn cầu (22) và lòng vị tha (9). Họ có thể cùng nhau thực hiện những dự án nhân đạo lớn.",
    },
  };

  function calculatePersonalDay(dob) {
    if (!dob) return null;
    const [year, month, day] = dob.split("-").map(Number);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const sum =
      sumDigits(day) +
      sumDigits(month) +
      sumDigits(currentDay) +
      sumDigits(currentMonth) +
      sumDigits(currentYear);
    return reduceToSingleDigit(sum, false);
  }

  function calculatePersonalMonth(dob) {
    if (!dob) return null;
    const [year, month, day] = dob.split("-").map(Number);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const sum =
      sumDigits(day) +
      sumDigits(month) +
      sumDigits(currentMonth) +
      sumDigits(currentYear);
    return reduceToSingleDigit(sum, false);
  }

  function renderDetails(data) {
    let html = "";
    const sections = [
      { id: "lifePath", title: "Số chủ đạo" },
      { id: "destiny", title: "Số sứ mệnh" },
      { id: "personality", title: "Số nhân cách" },
      { id: "soulUrge", title: "Số linh hồn" },
      { id: "attitude", title: "Số thái độ" },
      { id: "maturity", title: "Số trưởng thành" },
    ];

    sections.forEach((section) => {
      const number = data[section.id];
      const meaning =
        numerologyMeanings[section.id][number] || "Không tìm thấy luận giải.";
      html += `
                <h4>${section.title} (${number})</h4>
                <p>${meaning}</p>
            `;
    });

    numerologyDetails.innerHTML = html;
  }

  function fillNumerologyChart(name, dob) {
    chartCells.forEach((cell) => (cell.textContent = ""));
    const allDigits = {};

    if (dob) {
      const dobDigits = dob.replace(/-/g, "");
      for (const digit of dobDigits) {
        // Vẫn giữ lại việc loại bỏ số 0 vì nó không có trên biểu đồ
        if (digit !== "0") {
          const num = parseInt(digit);
          allDigits[num] = (allDigits[num] || 0) + 1;
        }
      }
    }

    // --- KHÔI PHỤC LOGIC TỪ HỌ VÀ TÊN ---
    if (name) {
      const normalizedName = name.toUpperCase().replace(/\s/g, "");
      for (const char of normalizedName) {
        if (nameToNumberMap[char]) {
          const number = nameToNumberMap[char];
          const singleDigit = reduceToSingleDigit(number, false); // Rút gọn về 1 chữ số
          allDigits[singleDigit] = (allDigits[singleDigit] || 0) + 1;
        }
      }
    }
    // --- KẾT THÚC PHẦN KHÔI PHỤC ---

    chartCells.forEach((cell) => {
      const cellNumber = parseInt(cell.dataset.number);
      const count = allDigits[cellNumber] || 0;
      if (count > 0) {
        cell.textContent = cellNumber.toString().repeat(count);
      }
    });

    renderChartArrows(allDigits);
  }

  function renderChartArrows(allDigits) {
    let arrowsHtml = "";
    const hasNumbers = (num) => (allDigits[num] || 0) > 0;
    const missingNumbers = (num) => (allDigits[num] || 0) === 0;

    const arrows = {
      "1-2-3": {
        has: hasNumbers(1) && hasNumbers(2) && hasNumbers(3),
        label: "Kế hoạch",
      },
      "4-5-6": {
        has: hasNumbers(4) && hasNumbers(5) && hasNumbers(6),
        label: "Ý chí",
      },
      "7-8-9": {
        has: hasNumbers(7) && hasNumbers(8) && hasNumbers(9),
        label: "Hoạt động",
      },
      "1-4-7": {
        has: hasNumbers(1) && hasNumbers(4) && hasNumbers(7),
        label: "Thực tế",
      },
      "2-5-8": {
        has: hasNumbers(2) && hasNumbers(5) && hasNumbers(8),
        label: "Cân bằng cảm xúc",
      },
      "3-6-9": {
        has: hasNumbers(3) && hasNumbers(6) && hasNumbers(9),
        label: "Trí tuệ",
      },
      "1-5-9": {
        has: hasNumbers(1) && hasNumbers(5) && hasNumbers(9),
        label: "Quyết tâm",
      },
      "3-5-7": {
        has: hasNumbers(3) && hasNumbers(5) && hasNumbers(7),
        label: "Nhạy cảm tâm linh",
      },
    };

    let hasArrow = false;
    for (const [key, value] of Object.entries(arrows)) {
      if (value.has) {
        arrowsHtml += `<p class="arrow-found">✅ Mũi tên ${value.label}: ${numerologyMeanings.arrows[key]}</p>`;
        hasArrow = true;
      }
    }

    const missingArrows = {
      "khuyet-1-2-3": {
        missing: missingNumbers(1) && missingNumbers(2) && missingNumbers(3),
        label: "Hỗn loạn",
      },
      "khuyet-4-5-6": {
        missing: missingNumbers(4) && missingNumbers(5) && missingNumbers(6),
        label: "Trì hoãn",
      },
      "khuyet-7-8-9": {
        missing: missingNumbers(7) && missingNumbers(8) && missingNumbers(9),
        label: "Thụ động",
      },
      "khuyet-1-4-7": {
        missing: missingNumbers(1) && missingNumbers(4) && missingNumbers(7),
        label: "Thiếu thực tế",
      },
      "khuyet-2-5-8": {
        missing: missingNumbers(2) && missingNumbers(5) && missingNumbers(8),
        label: "Nhạy cảm quá mức",
      },
      "khuyet-3-6-9": {
        missing: missingNumbers(3) && missingNumbers(6) && missingNumbers(9),
        label: "Trí nhớ kém",
      },
      "khuyet-1-5-9": {
        missing: missingNumbers(1) && missingNumbers(5) && missingNumbers(9),
        label: "Quyết tâm kém",
      },
      "khuyet-3-5-7": {
        missing: missingNumbers(3) && missingNumbers(5) && missingNumbers(7),
        label: "Thiếu tự tin",
      },
    };

    let hasMissingArrow = false;
    if (hasArrow) {
      arrowsHtml += "<hr>";
    }
    for (const [key, value] of Object.entries(missingArrows)) {
      if (value.missing) {
        if (!hasMissingArrow) {
          arrowsHtml += "<h4>Các Mũi tên bị khuyết</h4>";
          hasMissingArrow = true;
        }
        arrowsHtml += `<p class="arrow-missing">❌ Mũi tên ${value.label}: ${numerologyMeanings.arrows[key]}</p>`;
      }
    }

    if (!hasArrow && !hasMissingArrow) {
      arrowsHtml +=
        "<p>Biểu đồ của bạn không có mũi tên cá tính hoặc mũi tên khuyết nào đáng kể.</p>";
    }

    chartArrowsDiv.innerHTML = arrowsHtml;
  }

  function renderPyramid(pyramidData) {
    if (!pyramidData) {
      pyramidContainer.classList.add("hidden");
      return;
    }

    // Hiển thị các con số ở tầng đáy
    pyramidBaseMonth.textContent = pyramidData.base.month;
    pyramidBaseDay.textContent = pyramidData.base.day;
    pyramidBaseYear.textContent = pyramidData.base.year;

    // Hiển thị các đỉnh và tuổi tương ứng
    pyramidPeak1.textContent = pyramidData.peaks.p1.num;
    pyramidAge1.textContent = pyramidData.peaks.p1.age;

    pyramidPeak2.textContent = pyramidData.peaks.p2.num;
    pyramidAge2.textContent = pyramidData.peaks.p2.age;

    pyramidPeak3.textContent = pyramidData.peaks.p3.num;
    pyramidAge3.textContent = pyramidData.peaks.p3.age;

    pyramidPeak4.textContent = pyramidData.peaks.p4.num;
    pyramidAge4.textContent = pyramidData.peaks.p4.age;

    // Hiển thị luận giải
    let meaningsHtml = "<h4>Ý nghĩa các đỉnh</h4>";
    meaningsHtml += `<p><strong>Đỉnh 1 (Số ${
      pyramidData.peaks.p1.num
    }):</strong> ${numerologyMeanings.pyramid[pyramidData.peaks.p1.num]}</p>`;
    meaningsHtml += `<p><strong>Đỉnh 2 (Số ${
      pyramidData.peaks.p2.num
    }):</strong> ${numerologyMeanings.pyramid[pyramidData.peaks.p2.num]}</p>`;
    meaningsHtml += `<p><strong>Đỉnh 3 (Số ${
      pyramidData.peaks.p3.num
    }):</strong> ${numerologyMeanings.pyramid[pyramidData.peaks.p3.num]}</p>`;
    meaningsHtml += `<p><strong>Đỉnh 4 (Số ${
      pyramidData.peaks.p4.num
    }):</strong> ${numerologyMeanings.pyramid[pyramidData.peaks.p4.num]}</p>`;
    pyramidMeaningsDiv.innerHTML = meaningsHtml;

    pyramidContainer.classList.remove("hidden");
  }

  function renderKarmicDebt(karmicDebts) {
    if (karmicDebts.length > 0) {
      let html = "";
      karmicDebts.forEach((num) => {
        html += `<p class="karmic-debt-item">${numerologyMeanings.karmicDebt[num]}</p>`;
      });
      karmicDebtList.innerHTML = html;
      karmicDebtSection.classList.remove("hidden");
    } else {
      karmicDebtSection.classList.add("hidden");
    }
  }

  function renderPlanesOfExpression(planesData) {
    if (!planesData) {
      planesOfExpressionContainer.classList.add("hidden");
      return;
    }

    let html = "";

    let physicalMeaning =
      numerologyMeanings.planesOfExpression.physical.average;
    if (planesData.physical > 2) {
      physicalMeaning = numerologyMeanings.planesOfExpression.physical.high;
    } else if (planesData.physical === 0) {
      physicalMeaning = numerologyMeanings.planesOfExpression.physical.low;
    }

    let mentalMeaning = numerologyMeanings.planesOfExpression.mental.average;
    if (planesData.mental > 2) {
      mentalMeaning = numerologyMeanings.planesOfExpression.mental.high;
    } else if (planesData.mental === 0) {
      mentalMeaning = numerologyMeanings.planesOfExpression.mental.low;
    }

    let emotionalMeaning =
      numerologyMeanings.planesOfExpression.emotional.average;
    if (planesData.emotional > 2) {
      emotionalMeaning = numerologyMeanings.planesOfExpression.emotional.high;
    } else if (planesData.emotional === 0) {
      emotionalMeaning = numerologyMeanings.planesOfExpression.emotional.low;
    }

    html += `
            <p><strong>Mặt phẳng Thể chất (${planesData.physical}):</strong>  
            ${physicalMeaning}
            </p>
            <p><strong>Mặt phẳng Tinh thần (${planesData.mental}):</strong> 
            ${mentalMeaning}
            </p>
            <p><strong>Mặt phẳng Cảm xúc (${planesData.emotional}):</strong>
            ${emotionalMeaning}
            </p>
        `;

    planesOfExpressionDetails.innerHTML = html;
    planesOfExpressionContainer.classList.remove("hidden");
  }

  function renderDailyMonthlyReports(dob) {
    if (!dob) {
      reportsSection.classList.add("hidden");
      return;
    }
    const personalDay = calculatePersonalDay(dob);
    const personalMonth = calculatePersonalMonth(dob);
    personalDayNumberSpan.textContent = personalDay;
    personalDayMeaningP.textContent =
      numerologyMeanings.personalDay[personalDay];
    personalMonthNumberSpan.textContent = personalMonth;
    personalMonthMeaningP.textContent =
      numerologyMeanings.personalMonth[personalMonth];
    reportsSection.classList.remove("hidden");
  }

  function renderCompatibility(lifePath1, lifePath2) {
    if (lifePath1 === null || lifePath2 === null) {
      compatibilityResults.classList.add("hidden");
      return;
    }

    const [num1, num2] = [lifePath1, lifePath2].sort((a, b) => a - b);
    const compatibilityKey = `${num1}-${num2}`;
    const meaning =
      numerologyMeanings.compatibility[compatibilityKey] ||
      "Chưa có luận giải chi tiết cho cặp số này.";

    let html = `
            <h4>Kết quả tương hợp giữa Số Chủ đạo ${lifePath1} và ${lifePath2}</h4>
            <p>${meaning}</p>
        `;
    compatibilityResults.innerHTML = html;
    compatibilityResults.classList.remove("hidden");
  }

  function removeVietnameseTones(str) {
    str = str.trim();
    str = str.normalize("NFD");
    str = str.replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    str = str.replace(/\s+/g, " ");

    return str;
  }

  function updateResults() {
    const name = removeVietnameseTones(nameInput.value);
    const dob = dobInput.value;

    if (name && dob) {
      const lifePath = calculateLifePathNumber(dob);
      const destiny = calculateDestinyNumber(name);
      const soulUrge = calculateSoulUrgeNumber(name);
      const personality = calculatePersonalityNumber(name);
      const attitude = calculateAttitudeNumber(dob);
      const maturity = calculateMaturityNumber(lifePath, destiny);
      const personalYear = calculatePersonalYear(dob, new Date().getFullYear());
      const [year, month, day] = dob.split("-").map(Number);
      const karmicNumbers = [
        reduceNonMaster(sumDigits(day)),
        reduceNonMaster(sumDigits(month)),
        reduceNonMaster(sumDigits(year)),
        lifePath,
        destiny,
        soulUrge,
        personality,
      ];
      const pyramidData = calculatePyramid(dob, lifePath);
      const karmicDebts = findKarmicDebt(karmicNumbers);
      const planesOfExpressionData = calculatePlanesOfExpression(name);

      lifePathNumberP.textContent = lifePath;
      destinyNumberP.textContent = destiny;
      soulUrgeNumberP.textContent = soulUrge;
      personalityNumberP.textContent = personality;
      attitudeNumberP.textContent = attitude;
      maturityNumberP.textContent = maturity;
      personalYearP.textContent = personalYear;

      resultsLayout.classList.remove("hidden");
      bottomSections.classList.remove("hidden");

      renderDetails({
        lifePath,
        destiny,
        personality,
        soulUrge,
        attitude,
        maturity,
        personalYear,
      });
      fillNumerologyChart(name, dob);
      renderPyramid(pyramidData);
      renderKarmicDebt(karmicDebts);
      renderPlanesOfExpression(planesOfExpressionData);
      renderPersonalYearCycle(dob);

      renderDailyMonthlyReports(dob);
      compatibilitySection.classList.remove("hidden");
      if (partnerDobInput.value) {
        const lifePath1 = calculateLifePathNumber(dob);
        const lifePath2 = calculateLifePathNumber(partnerDobInput.value);
        renderCompatibility(lifePath1, lifePath2);
      }
    } else {
      resultsLayout.classList.add("hidden");
      bottomSections.classList.add("hidden");
      reportsSection.classList.add("hidden");
      compatibilitySection.classList.add("hidden");
    }
  }

  partnerDobInput.addEventListener("change", () => {
    const dob1 = dobInput.value;
    const dob2 = partnerDobInput.value;

    if (dob1 && dob2) {
      const lifePath1 = calculateLifePathNumber(dob1);
      const lifePath2 = calculateLifePathNumber(dob2);
      renderCompatibility(lifePath1, lifePath2);
    } else {
      compatibilityResults.classList.add("hidden");
    }
  });

  nameInput.addEventListener("input", updateResults);
  dobInput.addEventListener("change", updateResults);

  const handleShareClick = () => {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const shareStatus = document.getElementById("share-status-message");

    shareStatus.textContent = "";

    if (!name || !dob) {
      shareStatus.textContent = "Vui lòng nhập tên và ngày sinh.";
      shareStatus.classList.add("error");
      setTimeout(() => (shareStatus.textContent = ""), 3000);
      return;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("name", name);
    currentUrl.searchParams.set("dob", dob);

    navigator.clipboard
      .writeText(currentUrl.toString())
      .then(() => {
        shareStatus.textContent = "Đã sao chép URL!";
        shareStatus.classList.remove("error");
        shareStatus.classList.add("success");
        setTimeout(() => (shareStatus.textContent = ""), 3000);
      })
      .catch((err) => {
        console.error("Không thể sao chép URL: ", err);
        shareStatus.textContent = "Lỗi sao chép, thử lại.";
        shareStatus.classList.remove("success");
        shareStatus.classList.add("error");
        setTimeout(() => (shareStatus.textContent = ""), 3000);
      });
  };
  document
    .getElementById("share-btn")
    .addEventListener("click", handleShareClick);

  function checkAndFillFromQueryParams() {
    const name = urlParams.get("name");
    const dob = urlParams.get("dob");

    if (name) {
      document.getElementById("name").value = name;
    }
    if (dob) {
      document.getElementById("dob").value = dob;
    }

    if (name && dob) {
      updateResults();
    }
  }
  checkAndFillFromQueryParams();
});
