 // Cấu hình Gemini AI API
        const GEMINI_API_KEY = 'AIzaSyDfZhAPypqYdKGun2lTblYNheCHth5LXb8';
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        let conversationHistory = [];

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendQuickQuestion(question) {
            document.getElementById('messageInput').value = question;
            sendMessage();
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;

            // Hiển thị tin nhắn người dùng
            addMessage(message, 'user');
            input.value = '';
            
            // Hiển thị typing indicator
            showTypingIndicator();
            
            try {
                // Gọi API AI
                const response = await callAI(message);
                hideTypingIndicator();
                addMessage(response, 'bot');
            } catch (error) {
                hideTypingIndicator();
                addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
                console.error('API Error:', error);
            }
        }

        function addMessage(text, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = text.replace(/\n/g, '<br>');
            
            messageDiv.appendChild(contentDiv);
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'block';
            document.getElementById('sendBtn').disabled = true;
        }

        function hideTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'none';
            document.getElementById('sendBtn').disabled = false;
        }

        async function callAI(message) {
            // Thêm context cho chuyên gia sức khỏe
            const systemPrompt = `Bạn là một chuyên gia tư vấn sức khỏe và dinh dưỡng. Hãy trả lời bằng tiếng Việt, cung cấp thông tin chính xác, thực tế và hữu ích. Luôn nhắc nhở người dùng tham khảo ý kiến bác sĩ cho các vấn đề nghiêm trọng. Câu trả lời nên ngắn gọn, dễ hiểu và có cấu trúc rõ ràng.`;
            
            conversationHistory.push({role: "user", content: message});

            // Nếu chưa có API key thì dùng demo response
            if (!GEMINI_API_KEY || GEMINI_API_KEY === 'AIzaSyDfZhAPypqYdKGun2lTblYNheCHth5LXb8-01Ms') {
                return getDemoResponse(message);
            }

            // Gọi Gemini AI API
            try {
                const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${systemPrompt}\n\nCâu hỏi: ${message}`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 1000,
                            topP: 0.8,
                            topK: 10
                        }
                    })
                });

                const data = await response.json();
                
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    conversationHistory.push({role: "assistant", content: aiResponse});
                    return aiResponse;
                } else {
                    throw new Error('Không thể lấy phản hồi từ Gemini API');
                }
            } catch (error) {
                console.error('Gemini API Error:', error);
                return getDemoResponse(message);
            }
        }

        function getDemoResponse(message) {
            // Demo responses cho các chủ đề phổ biến
            const responses = {
                'giảm cân': `🍽️ Chế độ ăn giảm cân hiệu quả:**
                • Ăn nhiều rau xanh: Brokoli, cải bó xôi, cải thảo
                • Protein nạc: Thịt gà, cá, đậu phụ, trứng
                • Carb phức tạp: Gạo lứt, yến mạch, khoai lang
                • Uống đủ nước: 2-3 lít/ngày
                • Hạn chế: Đường, thức ăn chiên, đồ uống có ga

            Lưu ý: Giảm 0.5-1kg/tuần là an toàn. Nên tham khảo chuyên gia dinh dưỡng!`,
                'miễn dịch': `💪 Cách tăng cường miễn dịch:**
                • Vitamin C: Cam, chanh, ổi, kiwi
                • Zinc: Hạt bí, thịt đỏ, đậu
                • Vitamin D: Ánh nắng mặt trời, cá béo
                • Ngủ đủ giấc: 7-8 tiếng/đêm
                • Tập thể dục: 30 phút/ngày
                • Quản lý stress: Thiền, yoga

            Lưu ý: Nếu hay ốm, nên khám sức khỏe tổng quát!`,
                'tiểu đường': `🍎 **Chế độ ăn cho người tiểu đường:**
                • Nên ăn Rau xanh, cá, thịt nạc, gạo lứt
                • Hạn chế Đường, bánh ngọt, nước ngọt
                • Ăn nhiều bữa nhỏ 5-6 bữa/ngày
                • Kiểm soát portion Dùng đĩa nhỏ
                • Tập thể dục: Đi bộ sau ăn

            Quan trọng: Phải theo dõi đường huyết và tuân thủ điều trị của bác sĩ!`,
                'tim mạch': `❤️ Thực phẩm tốt cho tim mạch:**
                • Cá béo: Cá hồi, cá thu, cá ngừ
                • Hạt: Óc chó, hạnh nhân, hạt lanh
                • Trái cây: Việt quất, dâu tây, lựu
                • Rau xanh: Cải bó xôi, cải kale
                • Yến mạch: Giúp giảm cholesterol
                Tránh: Thức ăn nhiều muối, chất béo trans
                Lưu ý: Nên kiểm tra sức khỏe tim mạch định kỳ!`
            };

            // Tìm response phù hợp
            const lowerMessage = message.toLowerCase();
            for (let key in responses) {
                if (lowerMessage.includes(key)) {
                    return responses[key];
                }
            }

            // Default response
            return `Cám ơn bạn đã hỏi về "${message}". 

            Tôi là chatbot tư vấn sức khỏe demo. Để có trả lời chính xác hơn, bạn có thể:
            🔸 Hỏi về: dinh dưỡng, giảm cân, tăng miễn dịch, bệnh tiểu đường, tim mạch
            🔸 Sử dụng các gợi ý phía trên
            🔸 Tích hợp API AI thực tế (OpenAI, Gemini) vào code
                Lưu ý quan trọng: Luôn tham khảo ý kiến bác sĩ cho các vấn đề sức khỏe nghiêm trọng!`;
        }

        // Khởi tạo
        document.getElementById('messageInput').focus();





//          // Cấu hình Gemini AI API
// const GEMINI_API_KEY = 'AIzaSyDfZhAPypqYdKGun2lTblYNheCHth5LXb8';
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
// let conversationHistory = [];

//         function handleKeyPress(event) {
//             if (event.key === 'Enter') {
//                 sendMessage();
//             }
//         }

//         function sendQuickQuestion(question) {
//             document.getElementById('messageInput').value = question;
//             sendMessage();
//         }

//         async function sendMessage() {
//             const input = document.getElementById('messageInput');
//             const message = input.value.trim();
            
//             if (!message) return;

//             // Hiển thị tin nhắn người dùng
//             addMessage(message, 'user');
//             input.value = '';
            
//             // Hiển thị typing indicator
//             showTypingIndicator();
            
//             try {
//                 // Gọi API AI
//                 const response = await callAI(message);
//                 hideTypingIndicator();
//                 addMessage(response, 'bot');
//             } catch (error) {
//                 hideTypingIndicator();
//                 addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
//                 console.error('API Error:', error);
//             }
//         }

//         function addMessage(text, sender) {
//             const messagesContainer = document.getElementById('chatMessages');
//             const messageDiv = document.createElement('div');
//             messageDiv.className = `message ${sender}`;
            
//             const contentDiv = document.createElement('div');
//             contentDiv.className = 'message-content';
//             contentDiv.innerHTML = text.replace(/\n/g, '<br>');
            
//             messageDiv.appendChild(contentDiv);
//             messagesContainer.appendChild(messageDiv);
            
//             // Scroll to bottom
//             messagesContainer.scrollTop = messagesContainer.scrollHeight;
//         }

//         function showTypingIndicator() {
//             document.getElementById('typingIndicator').style.display = 'block';
//             document.getElementById('sendBtn').disabled = true;
//         }

//         function hideTypingIndicator() {
//             document.getElementById('typingIndicator').style.display = 'none';
//             document.getElementById('sendBtn').disabled = false;
//         }

//         async function callAI(message) {
//             // Thêm context cho chuyên gia sức khỏe
//             const systemPrompt = `Bạn là một chuyên gia tư vấn sức khỏe và dinh dưỡng có 15 năm kinh nghiệm. Hãy trả lời bằng tiếng Việt một cách CHI TIẾT và ĐẦY ĐỦ. 

//         QUAN TRỌNG - HÃY TRỢ GIÚP TOÀN DIỆN:
//         - Giải thích rõ ràng nguyên lý khoa học
//         - Đưa ra ví dụ cụ thể và thực tế 
//         - Chia thành các mục rõ ràng với bullet points
//         - Cung cấp lời khuyên thực hành chi tiết
//         - Đề xuất kế hoạch từng bước
//         - Giải thích tại sao và như thế nào
//         - Nêu các lưu ý quan trọng

// HÃY VIẾT CÂU TRẢ LỜI DÀI, CHI TIẾT VÀ TOÀN DIỆN. Không ngại viết nhiều đoạn văn để người dùng hiểu rõ vấn đề. Luôn nhắc nhở tham khảo bác sĩ khi cần thiết.`;
            
//             conversationHistory.push({role: "user", content: message});

//             // Nếu chưa có API key thì dùng demo response
//             if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
//                 return getDemoResponse(message);
//             }

//             // Gọi Gemini AI API
//             try {
//                 const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         contents: [{
//                             parts: [{
//                                 text: `${systemPrompt}\n\nCâu hỏi: ${message}`
//                             }]
//                         }],
//                         generationConfig: {
//                             temperature: 0.7,
//                             maxOutputTokens: 2000,
//                             topP: 0.9,
//                             topK: 20
//                         }
//                     })
//                 });

//                 const data = await response.json();
                
//                 if (data.candidates && data.candidates[0] && data.candidates[0].content) {
//                     const aiResponse = data.candidates[0].content.parts[0].text;
//                     conversationHistory.push({role: "assistant", content: aiResponse});
//                     return aiResponse;
//                 } else {
//                     throw new Error('Không thể lấy phản hồi từ Gemini API');
//                 }
//             } catch (error) {
//                 console.error('Gemini API Error:', error);
//                 return getDemoResponse(message);
//             }
//         }

//         function getDemoResponse(message) {
//             // Demo responses chi tiết hơn cho các chủ đề phổ biến
//             const responses = {
//                 'giảm cân': `🔥 **HƯỚNG DẪN GIẢM CÂN KHOA HỌC VÀ BỀN VỮNG**

// **💡 NGUYÊN LÝ CƠ BẢN:**
// Giảm cân xảy ra khi bạn tiêu thụ ít calo hơn so với năng lượng cơ thể đốt cháy (deficit calo). Mục tiêu an toàn là giảm 0.5-1kg/tuần, tương đương thiếu hụt 500-750 calo/ngày.

// **🍽️ CHỈ TIẾT CHẾ ĐỘ ĂN:**

// *Bữa sáng (400-500 calo):*
// • 1 bát yến mạch + 1 quả chuối + 10 hạt óc chó
// • Hoặc: 2 lát bánh mì nguyên cám + 1 quả trứng luộc + rau xà lách
// • 1 cốc nước chanh không đường

// *Bữa trưa (500-600 calo):*
// • 100g thịt gà/cá/đậu phụ nướng
// • 1 chén cơm gạo lứt (khoảng 150g)
// • Nhiều rau xanh: brokoli, cải thảo, dưa chuột
// • 1 chén canh rau không dầu mỡ

// *Bữa tối (400-500 calo):*
// • Salad lớn với rau xanh đa dạng
// • 80g protein (thịt nạc, cá, tôm)
// • 1 củ khoai lang nhỏ nướng
// • Dressing: dầu ô liu + chanh

// *Snack (100-150 calo/ngày):*
// • 1 quả táo + 1 thìa hạnh nhân
// • Sữa chua Hy Lạp không đường
// • Cà rốt thái que + hummus

// **💪 KẾT HỢP VẬN ĐỘNG:**
// • Cardio: 30-45 phút, 4-5 lần/tuần (đi bộ nhanh, chạy, bơi)
// • Tập tạ: 2-3 lần/tuần để giữ cơ bắp
// • HIIT: 15-20 phút, 2 lần/tuần cho đốt mỡ nhanh

// **⚠️ LƯU Ý QUAN TRỌNG:**
// - Uống 2.5-3 lít nước/ngày
// - Ngủ đủ 7-8 tiếng để cân bằng hormone
// - Không bỏ bữa, ăn đều 4-5 bữa nhỏ
// - Theo dõi cân nặng 1 lần/tuần vào buổi sáng
// - Nếu có bệnh lý, tham khảo bác sĩ trước khi giảm cân`,

//                 'miễn dịch': `🛡️ **TĂNG CƯỜNG HỆ MIỄN DỊCH TOÀN DIỆN**

// **🧬 HIỂU VỀ HỆ MIỄN DỊCH:**
// Hệ miễn dịch là mạng lưới phức tạp gồm tế bào, mô và cơ quan bảo vệ cơ thể khỏi vi khuẩn, virus và độc tố. Khi hệ miễn dịch yếu, bạn dễ mắc bệnh và hồi phục chậm.

// **🥗 DINH DƯỠNG TĂNG MIỄN DỊCH:**

// *Vitamin C (80-120mg/ngày):*
// • Cam, chanh: 1-2 quả/ngày
// • Ổi: 1 quả cung cấp 200mg vitamin C
// • Kiwi, dâu tây, brokoli
// • Vai trò: Kích thích sản xuất bạch cầu

// *Vitamin D (1000-2000 IU/ngày):*
// • Phơi nắng 15-20 phút buổi sáng
// • Cá hồi, cá thu, trứng
// • Nấm maitake, nấm portobello
// • Vai trò: Điều hòa phản ứng miễn dịch

// *Zinc (8-11mg/ngày):*
// • Hạt bí ngô: 2 thìa/ngày
// • Thịt đỏ nạc, tôm cua
// • Đậu đen, đậu lăng
// • Vai trò: Hỗ trợ hoạt động tế bào T

// *Probiotic:*
// • Sữa chua không đường, kimchi
// • Tempeh, miso, kefir
// • Suplement probiotic 10-50 tỷ CFU
// • Vai trò: 70% miễn dịch nằm ở ruột

// **💤 LỐI SỐNG TĂNG MIỄN DỊCH:**
// • Ngủ 7-9 tiếng: Cơ thể sản xuất cytokine chống viêm
// • Tập thể dục vừa phải: 30 phút đi bộ nâng miễn dịch 24h
// • Quản lý stress: Yoga, thiền, nghe nhạc
// • Không hút thuốc, hạn chế rượu

// **🌿 THẢO DƯỢC HỖ TRỢ:**
// • Tỏi: Allicin có tác dụng kháng khuẩn
// • Gừng: Gingerol chống viêm
// • Nghệ: Curcumin tăng cường miễn dịch
// • Trà xanh: EGCG bảo vệ tế bào

// **⚠️ DẤU HIỆU NÊN KHÁM BÁC SĨ:**
// - Ốm liên tục trên 3 lần/năm
// - Nhiễm trùng kéo dài
// - Mệt mỏi thường xuyên
// - Vết thương lâu lành`,

//                 'tiểu đường': `🩺 **QUẢN LÝ BỆNH TIỂU ĐƯỜNG TYPE 2**

// **📊 HIỂU VỀ TIỂU ĐƯỜNG:**
// Tiểu đường type 2 xảy ra khi cơ thể không sử dụng insulin hiệu quả (kháng insulin). Mục tiêu: Giữ đường huyết ổn định 80-130 mg/dL lúc đói, <180 mg/dL sau ăn 2h.

// **🍎 CHẾ ĐỘ ĂN CHI TIẾT:**

// *Nguyên tắc cơ bản:*
// • Carb phức tạp thay thế carb đơn
// • Ăn nhiều bữa nhỏ (5-6 bữa/ngày)
// • Kết hợp protein + chất xơ mỗi bữa
// • Kiểm soát portion size

// *Thực phẩm NÊN ăn (chỉ số GI thấp):*
// • Gạo lứt, yến mạch, quinoa
// • Rau xanh: brokoli, cải bó xôi, atiso
// • Protein nạc: cá, gà, đậu phụ
// • Các loại hạt: óc chó, hạnh nhân
// • Trái cây: táo, lê, berry (có vỏ)

// *Thực phẩm TRÁNH (chỉ số GI cao):*
// • Gạo trắng, bánh mì trắng, khoai tây
// • Đường, mật ong, nước ngọt
// • Bánh kẹo, kem, nước trái cây đóng hộp
// • Thức ăn chiên, đồ ăn nhanh

// *Thực đơn mẫu 1 ngày:*

// Sáng: Yến mạch + quả berry + hạt chia + sữa hạnh nhân
// Phụ sáng: 1 quả táo + 10 hạt óc chó
// Trưa: Cơm gạo lứt + cá nướng + rau luộc + dầu ô liu
// Phụ chiều: Sữa chua Hy Lạp + quế
// Tối: Salad quinoa + thịt gà + rau củ nướng
// Tối muộn: 1 cốc sữa đậu nành không đường

// **🏃‍♂️ VẬN ĐỘNG ĐIỀU TRỊ:**
// • Đi bộ sau ăn 15-30 phút: Giảm đường huyết 20-30%
// • Aerobic: 150 phút/tuần cường độ vừa
// • Tập tạ: 2-3 lần/tuần tăng độ nhạy insulin
// • Kiểm tra đường huyết trước/sau tập

// **💊 THEO DÕI VÀ ĐIỀU TRỊ:**
// • Đo đường huyết: Sáng đói và sau ăn 2h
// • HbA1c: Kiểm tra 3-6 tháng/lần, mục tiêu <7%
// • Uống thuốc đúng giờ theo chỉ định bác sĩ
// • Khám mắt, thận, chân định kỳ

// **⚠️ CẤP CỨU KHI:**
// - Đường huyết >300 mg/dL
// - Hôn mê, lú lẫn
// - Buồn nôn, đau bụng dữ dội
// - Thở có mùi trái cây (ceton)`,

//                 'tim mạch': `❤️ **BẢO VỆ TIM MẠCH TOÀN DIỆN**

// **🫀 TIM KHỎE MẠNH LÀ GÌ:**
// Tim khỏe có nhịp đập 60-100 lần/phút, huyết áp <120/80 mmHg, cholesterol tổng <200 mg/dL. Bệnh tim mạch là nguyên nhân tử vong số 1 thế giới, nhưng có thể phòng ngừa 80% bằng lối sống.

// **🐟 DINH DƯỠNG CHO TIM:**

// *Omega-3 (1-2g/ngày):*
// • Cá hồi, cá thu, cá ngừ: 2-3 bữa/tuần
// • Hạt lanh, hạt chia: 1 thìa/ngày
// • Óc chó: 7-10 quả/ngày
// • Vai trò: Giảm viêm, chống đông máu

// *Chất xơ hòa tan (25-35g/ngày):*
// • Yến mạch: 1 bát giảm cholesterol 5-10%
// • Đậu đen, đậu đỏ: 1/2 chén/ngày
// • Táo, lê (có vỏ): 1-2 quả/ngày
// • Vai trò: Hấp thụ cholesterol xấu

// *Kali (3500-4700mg/ngày):*
// • Chuối: 1 quả = 400mg kali
// • Khoai lang, bí đỏ nướng
// • Rau bina, cần tây
// • Vai trò: Cân bằng natri, giảm huyết áp

// *Chất chống oxy hóa:*
// • Việt quất, dâu tây: 1 chén/ngày
// • Chocolate đen 70%: 1-2 miếng
// • Trà xanh: 2-3 cốc/ngày
// • Vai trò: Bảo vệ động mạch khỏi tổn thương

// **🚫 THỰC PHẨM HẠI TIM:**
// • Muối >2300mg/ngày: Tăng huyết áp
// • Chất béo trans: Margarine, đồ chiên
// • Đường phụ gia: Nước ngọt, bánh kẹo
// • Thịt đỏ quá nhiều: >500g/tuần

// **🏃 VẬN ĐỘNG CHO TIM:**
// • Cardio nhẹ: Đi bộ nhanh 30 phút/ngày
// • Bơi lội: Tăng sức bền tim phổi
// • Đạp xe: Cải thiện tuần hoàn
// • Yoga: Giảm stress, hạ huyết áp
// • Mục tiêu: 150 phút/tuần cường độ vừa

// **🧘‍♀️ QUẢN LÝ STRESS:**
// Stress mãn tính tăng cortisol, gây viêm động mạch:
// • Thiền 10-20 phút/ngày
// • Hít thở sâu 4-7-8 (hít 4s, nín 7s, thở ra 8s)
// • Nghe nhạc cổ điển giảm huyết áp
// • Dành thời gian trong tự nhiên

// **💤 GIẤC NGỦ VÀ TIM:**
// • Ngủ 7-8 tiếng: Giảm 22% nguy cơ tim mạch
// • Tránh thức khuya: Rối loạn circadian
// • Điều trị ngưng thở khi ngủ nếu có

// **⚠️ DẤU HIỆU CẢNH BÁO:**
// - Đau ngực, khó thở
// - Đau lan ra tay trái, hàm
// - Chóng mặt, mệt mỏi bất thường
// - Phù chân, tăng cân đột ngột
// ➜ GỌI CẤP CỨU 115 NGAY LẬP TỨC!`
//             };

//             // Tìm response phù hợp
//             const lowerMessage = message.toLowerCase();
//             for (let key in responses) {
//                 if (lowerMessage.includes(key)) {
//                     return responses[key];
//                 }
//             }

//             // Default response chi tiết
//             return `💡 **CÂU HỎI VỀ: "${message}"**

// Cảm ơn bạn đã tin tưởng tư vấn sức khỏe! Đây là chatbot demo sử dụng Google Gemini AI.

// **🔥 ĐỂ NHẬN TƯ VẤN CHI TIẾT, BạN CÓ THỂ HỎI VỀ:**

// **🍎 Dinh dưỡng & Giảm cân:**
// • "Chế độ ăn giảm cân cho người 70kg"
// • "Thực đơn tăng cơ bắp"
// • "Cách tính calo hàng ngày"

// **💪 Tăng cường sức khỏe:**
// • "Cách tăng miễn dịch mùa lạnh"
// • "Vitamin cần thiết cho phụ nữ 30 tuổi"
// • "Thực phẩm tốt cho não bộ"

// **🏥 Bệnh lý thường gặp:**
// • "Chế độ ăn cho người tiểu đường"
// • "Cách giảm cholesterol tự nhiên"
// • "Phòng ngừa bệnh tim mạch"

// **🏃‍♀️ Lối sống lành mạnh:**
// • "Lịch tập gym cho người mới bắt đầu"
// • "Cách cải thiện giấc ngủ"
// • "Quản lý stress hiệu quả"

// **⚡ TÍCH HỢP GEMINI AI THỰC TẾ:**
// 1. Lấy API key tại: https://makersuite.google.com/app/apikey
// 2. Thay vào code: \`const GEMINI_API_KEY = 'your-key-here'\`
// 3. Nhận tư vấn AI chi tiết và chuyên sâu!

// **⚠️ LƯU Ý QUAN TRỌNG:**
// Thông tin chỉ mang tính chất tham khảo. Với các vấn đề sức khỏe nghiêm trọng, hãy tham khảo ý kiến bác sĩ chuyên khoa để được chẩn đoán và điều trị chính xác nhất.

// Hãy hỏi cụ thể hơn để tôi có thể tư vấn chi tiết nhé! 🌟`;
//         }

//         // Khởi tạo
//         document.getElementById('messageInput').focus();