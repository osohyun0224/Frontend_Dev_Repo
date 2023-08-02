import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InputForm from "../../components/InputForm.jsx";
import BackButton from "../../assets/images/getback.png";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1000px;
  padding-top: 30px;
  padding-left: 50px;
  position: relative;
  z-index: 1;
`;

const BackButtonImage = styled.img`
  position: absolute;
  margin-top: 0px;
  margin-left: -40px;
  cursor: pointer;
`;

const SignupTitle = styled.h3`
  font-family: "Nanum Gothic";
  font-size: 24px;
  font-weight: 700;
  margin-top: 80px;
  margin-left: -20px;
  color: #667080;
`;

const SignupText = styled.p`
  font-family: "Nanum Gothic";
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  margin-top: 10px;
  margin-left: -20px;
  color: #667080;
`;

const PasswordInput = styled(InputForm)``;

// const ConditionText = styled.p`
//   font-size: 10px;
//   color: ${(props) => (props.$isValid ? "green" : "red")};
//   margin-top: 10px;
// `;

const BottomBox = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 84px;
  background-color: ${(props) => (props.$isValid ? "#667080" : "#aaa")};
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  text-decoration: none;
  margin-left: -50px;
  pointer-events: ${(props) => (props.$isValid ? "all" : "none")};
`;

const RequirementsContainer = styled.div`
  font-family: "Nanum Gothic";
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-top: -30px;
`;

const RequirementText = styled.span`
  font-family: "Nanum Gothic";
  font-weight: 500;
  font-size: 14px;
  font-family: "Nanum Gothic";
  color: ${(props) => (props.$isValid ? "green" : "red")};
  margin-right: 10px;
  font-weight: 500;
`;

const ConfirmationText = styled.span`
  font-family: "Nanum Gothic";
  font-weight: 500;
  font-size: 14px;
  color: ${(props) =>
    props.$isValid === null ? "red" : props.$isValid ? "green" : "red"};
  margin-top: -30px;
`;

function PasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [lengthRequirement, setLengthRequirement] = useState(false);
  const [letterRequirement, setLetterRequirement] = useState(false);
  const [numberRequirement, setNumberRequirement] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setLengthRequirement(passwordValue.length >= 8);
    setLetterRequirement(/[a-zA-Z]/.test(passwordValue));
    setNumberRequirement(/\d/.test(passwordValue));
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  useEffect(() => {
    const checkPassword = (password, passwordCheck) => {
      const matchRequirement = password === passwordCheck;
      setIsValid(
        lengthRequirement &&
          letterRequirement &&
          numberRequirement &&
          matchRequirement,
      );
      setIsPasswordMatch(password && passwordCheck ? matchRequirement : null);
    };

    checkPassword(password, passwordCheck);
  }, [
    password,
    passwordCheck,
    lengthRequirement,
    letterRequirement,
    numberRequirement,
  ]);

  return (
    <PageContainer>
      <Link to="/">
        <BackButtonImage src={BackButton} alt="Back" />
      </Link>
      <SignupTitle>회원가입</SignupTitle>
      <SignupText>
        로그인에 사용할 <br /> 비밀번호를 입력해주세요.
      </SignupText>
      <PasswordInput
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        type="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <RequirementsContainer>
        <RequirementText $isValid={lengthRequirement}>
          8자 이상 {lengthRequirement ? "✓" : ""}
        </RequirementText>
        <RequirementText $isValid={letterRequirement}>
          영문 포함 {letterRequirement ? "✓" : ""}
        </RequirementText>
        <RequirementText $isValid={numberRequirement}>
          숫자 포함 {numberRequirement ? "✓" : ""}
        </RequirementText>
      </RequirementsContainer>
      <PasswordInput
        label="비밀번호 확인"
        placeholder="비밀번호를 입력하세요."
        type="password"
        onChange={handlePasswordCheckChange}
        value={passwordCheck}
      />
      <ConfirmationText $isValid={isPasswordMatch}>
        비밀번호 확인{" "}
        {isPasswordMatch !== null ? (isPasswordMatch ? "✓" : "") : ""}
      </ConfirmationText>
      <BottomBox to="/compelete" $isValid={isValid}>
        다음
      </BottomBox>
    </PageContainer>
  );
}
export default PasswordPage;
